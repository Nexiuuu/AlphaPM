package pl.alphapm.website.task.data.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import pl.alphapm.website.global.enums.ProjectPermission;
import pl.alphapm.website.global.exceptions.BadRequestException;
import pl.alphapm.website.global.exceptions.ResourceNotFoundException;
import pl.alphapm.website.task.data.TaskRepository;
import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.dto.TaskDTO;
import pl.alphapm.website.task.data.dto.TaskDetailsDTO;
import pl.alphapm.website.task.data.entities.Task;
import pl.alphapm.website.task.data.entities.TaskDetails;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void rejectTaskWithInvalidDateRangeTest() {
        OffsetDateTime start = OffsetDateTime.parse("2026-10-29T12:00:00Z");

        CreateTaskRequestDTO request = new CreateTaskRequestDTO(
                "Test task",
                UUID.randomUUID(),
                "#FF0000",
                start,
                start.plusSeconds(30),
                false,
                "Test description",
                List.of(),
                List.of(),
                ProjectPermission.values()[0]
        );

        assertThrows(
                BadRequestException.class,
                () -> taskService.createTask(request)
        );

        verifyNoInteractions(taskRepository);
    }

    @Test
    void createTaskTest() {
        UUID userId = UUID.randomUUID();
        UUID taskId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();

        OffsetDateTime start = OffsetDateTime.parse("2026-10-29T12:00:00Z");
        OffsetDateTime end = start.plusHours(1);
        OffsetDateTime now = OffsetDateTime.parse("2026-10-29T11:00:00Z");

        CreateTaskRequestDTO request = new CreateTaskRequestDTO(
                "Test task",
                projectId,
                "#FF0000",
                start,
                end,
                false,
                "Test description",
                List.of(),
                List.of(),
                ProjectPermission.values()[0]
        );

        TaskDetails task = new TaskDetails(
                taskId,
                "Test task",
                userId,
                "Test user",
                projectId,
                "#FF0000",
                start,
                end,
                false,
                List.of(),
                List.of(),
                "Test description",
                now,
                now,
                ProjectPermission.values()[0]
        );

        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "none")
                .subject(userId.toString())
                .issuedAt(now.toInstant())
                .expiresAt(now.plusHours(1).toInstant())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new JwtAuthenticationToken(jwt)
        );

        when(taskRepository.createTask(request, userId))
                .thenReturn(task);

        try {
            TaskDetailsDTO result = taskService.createTask(request);

            assertNotNull(result);
            assertEquals(taskId, result.id());
            assertEquals("Test task", result.name());
            assertEquals(projectId, result.projectId());
            assertEquals(userId, result.authorId());

            verify(taskRepository).createTask(request, userId);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    @Test
    void getTasksTest() {
        UUID userId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();
        UUID taskId = UUID.randomUUID();

        OffsetDateTime from = OffsetDateTime.parse("2026-10-29T12:00:00Z");
        OffsetDateTime to = from.plusDays(1);

        Task task = new Task(
                taskId,
                "name",
                userId,
                projectId,
                "#FF0000",
                from,
                to,
                true,
                "description",
                from.minusHours(1),
                from.minusHours(1)
        );

        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "none")
                .subject(userId.toString())
                .issuedAt(from.toInstant())
                .expiresAt(to.toInstant())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new JwtAuthenticationToken(jwt)
        );

        when(taskRepository.getTasks(projectId, userId, from, to))
                .thenReturn(List.of(task));

        try {
            List<TaskDTO> result
                    = taskService.getTasks(projectId, from, to);

            assertEquals(1, result.size());

            TaskDTO resultTask = result.get(0);

            assertEquals(taskId, resultTask.id());
            assertEquals("name", resultTask.name());
            assertEquals(projectId, resultTask.projectId());
            assertEquals("#FF0000", resultTask.color());
            assertEquals(from, resultTask.startsAt());
            assertEquals(to, resultTask.endsAt());
            assertEquals(true, resultTask.allDay());

            verify(taskRepository).getTasks(projectId, userId, from, to);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    @Test
    void rejectTasksWithInvalidDateRangeTest() {
        UUID projectId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        OffsetDateTime from = OffsetDateTime.parse("2026-10-29T14:00:00Z");
        OffsetDateTime to = OffsetDateTime.parse("2026-10-29T12:00:00Z");
        OffsetDateTime now = OffsetDateTime.parse("2026-10-29T11:00:00Z");

        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "none")
                .subject(userId.toString())
                .issuedAt(now.toInstant())
                .expiresAt(now.plusHours(1).toInstant())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new JwtAuthenticationToken(jwt)
        );

        try {
            assertThrows(
                    BadRequestException.class,
                    () -> taskService.getTasks(projectId, from, to)
            );

            verifyNoInteractions(taskRepository);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    @Test
    void getTaskTest() {
        UUID userId = UUID.randomUUID();
        UUID taskId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();

        OffsetDateTime start = OffsetDateTime.parse("2026-10-29T12:00:00Z");
        OffsetDateTime end = start.plusHours(1);
        OffsetDateTime now = start.minusHours(1);

        TaskDetails task = new TaskDetails(
                taskId,
                "Test task",
                userId,
                "Test user",
                projectId,
                "#FF0000",
                start,
                end,
                false,
                List.of(),
                List.of(),
                "Test description",
                now,
                now,
                ProjectPermission.values()[0]
        );

        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "none")
                .subject(userId.toString())
                .issuedAt(now.toInstant())
                .expiresAt(now.plusHours(1).toInstant())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new JwtAuthenticationToken(jwt)
        );

        when(taskRepository.getTask(taskId, userId))
                .thenReturn(task);

        try {
            TaskDetailsDTO result = taskService.getTask(taskId);

            assertNotNull(result);
            assertEquals(taskId, result.id());
            assertEquals("Test task", result.name());
            assertEquals(projectId, result.projectId());
            assertEquals(userId, result.authorId());

            verify(taskRepository).getTask(taskId, userId);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    @Test
    void getTaskPropagatesNotFoundExceptionTest() {
        UUID userId = UUID.randomUUID();
        UUID taskId = UUID.randomUUID();
        OffsetDateTime now = OffsetDateTime.now();

        Jwt jwt = Jwt.withTokenValue("test-token")
                .header("alg", "none")
                .subject(userId.toString())
                .issuedAt(now.toInstant())
                .expiresAt(now.plusHours(1).toInstant())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new JwtAuthenticationToken(jwt)
        );

        try {
            when(taskRepository.getTask(taskId, userId))
                    .thenThrow(new ResourceNotFoundException("Task couldn't be found"));

            assertThrows(
                    ResourceNotFoundException.class,
                    () -> taskService.getTask(taskId)
            );

            verify(taskRepository).getTask(taskId, userId);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }
}

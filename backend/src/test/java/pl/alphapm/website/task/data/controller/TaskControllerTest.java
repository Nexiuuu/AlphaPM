package pl.alphapm.website.task.data.controller;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import pl.alphapm.website.global.enums.ProjectPermission;
import pl.alphapm.website.middleware.RequestIdCounter;
import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.service.TaskService;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(
        controllers = TaskController.class,
        excludeAutoConfiguration = {
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.web.OAuth2ResourceServerWebSecurityAutoConfiguration.class,
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.OAuth2ResourceServerAutoConfiguration.class
        }
)
@ActiveProfiles("test")
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    @MockitoBean
    private RequestIdCounter requestIdCounter;

    private CreateTaskRequestDTO validRequest() {
        OffsetDateTime start
                = OffsetDateTime.parse("2026-10-29T12:00:00Z");

        return new CreateTaskRequestDTO(
                "Test task",
                UUID.randomUUID(),
                "#FF0000",
                start,
                start.plusHours(1),
                false,
                "Test description",
                List.of(),
                List.of(),
                ProjectPermission.values()[0]
        );
    }

    private CreateTaskRequestDTO makeCreateTaskRequestDTOWithName(String name) {
        CreateTaskRequestDTO valid = validRequest();

        return new CreateTaskRequestDTO(
                name,
                valid.projectId(),
                valid.color(),
                valid.startsAt(),
                valid.endsAt(),
                valid.allDay(),
                valid.description(),
                valid.groupsIds(),
                valid.categoryIds(),
                valid.visibleTo()
        );
    }

    @Test
    void createTaskTest() throws Exception {
        CreateTaskRequestDTO request = validRequest();

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(taskService).createTask(request);
    }

    @Test
    void rejectBlankTaskNameTest() throws Exception {
        CreateTaskRequestDTO request = makeCreateTaskRequestDTOWithName(" ");

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(taskService);
    }

    @Test
    void rejectNullTaskNameTest() throws Exception {
        CreateTaskRequestDTO request = makeCreateTaskRequestDTOWithName(null);

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(taskService);
    }

    @Test
    void rejectInvalidJsonTest() throws Exception {
        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(taskService);
    }
}

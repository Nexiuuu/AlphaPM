package pl.alphapm.website.task.data.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import pl.alphapm.website.global.exceptions.BadRequestException;
import pl.alphapm.website.task.data.TaskRepository;
import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.dto.TaskDTO;
import pl.alphapm.website.task.data.dto.TaskDetailsDTO;
import pl.alphapm.website.task.data.entities.Task;
import pl.alphapm.website.task.data.entities.TaskDetails;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private UUID getCurrentUserId() {
        JwtAuthenticationToken authentication
                = (JwtAuthenticationToken) SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return UUID.fromString(
                authentication.getToken().getSubject()
        );
    }

    public TaskDetailsDTO createTask(
            CreateTaskRequestDTO request
    ) {
        if (request.endsAt().isBefore(request.startsAt().plusMinutes(1))) {
            throw new BadRequestException("Starts date can't be after ends date");
        }

        UUID userId = getCurrentUserId();

        TaskDetails task = taskRepository.createTask(
                request,
                userId
        );

        return toDTO(task);
    }

    private TaskDetailsDTO toDTO(TaskDetails task) {
        return new TaskDetailsDTO(
                task.getId(),
                task.getName(),
                task.getProjectId(),
                task.getColor(),
                task.getStartsAt(),
                task.getEndsAt(),
                task.isAllDay(),
                task.getAuthorId(),
                task.getAuthorName(),
                task.getGroups(),
                task.getCategories(),
                task.getDescription(),
                task.getCreatedAt(),
                task.getLastUpdate(),
                task.getVisibleTo()
        );
    }

    private TaskDTO toDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getName(),
                task.getProjectId(),
                task.getColor(),
                task.getStartsAt(),
                task.getEndsAt(),
                task.isAllDay()
        );
    }

    public List<TaskDTO> getTasks(UUID projectId) {
        UUID userId = getCurrentUserId();

        List<Task> tasks = taskRepository.getTasks(projectId, userId);

        return tasks.stream()
                .map(this::toDTO)
                .toList();
    }

    public TaskDetailsDTO getTask(UUID taskId) {
        UUID userId = getCurrentUserId();

        TaskDetails task = taskRepository.getTask(taskId, userId);

        return toDTO(task);
    }
}

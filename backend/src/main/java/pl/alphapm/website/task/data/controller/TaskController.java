package pl.alphapm.website.task.data.controller;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.dto.TaskDTO;
import pl.alphapm.website.task.data.dto.TaskDetailsDTO;
import pl.alphapm.website.task.data.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDetailsDTO createTask(
            @Valid @RequestBody CreateTaskRequestDTO request
    ) {
        return taskService.createTask(request);
    }

    @GetMapping
    public List<TaskDTO> getTasks(
            @RequestParam(required = false) UUID projectId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime to
    ) {
        return taskService.getTasks(projectId, from, to);
    }

    @GetMapping("/{taskId}")
    public TaskDetailsDTO getTask(
            @PathVariable UUID taskId
    ) {
        return taskService.getTask(taskId);
    }
}

package pl.alphapm.website.task.data;

import java.util.List;
import java.util.UUID;

import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.dto.UpdateTaskRequestDTO;
import pl.alphapm.website.task.data.entities.Task;
import pl.alphapm.website.task.data.entities.TaskDetails;

public interface TaskRepository {

    TaskDetails createTask(
            CreateTaskRequestDTO request,
            UUID userId
    );

    List<Task> getTasks(
            UUID projectId,
            UUID userId
    );

    TaskDetails getTask(
            UUID taskId,
            UUID userId
    );

    TaskDetails updateTask(
            UUID taskId,
            UpdateTaskRequestDTO request,
            UUID userId
    );

    void deleteTask(
            UUID taskId,
            UUID userId
    );
}

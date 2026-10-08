package pl.alphapm.website.task.data.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import pl.alphapm.website.global.enums.ProjectPermission;
import pl.alphapm.website.task.data.entities.TaskCategory;
import pl.alphapm.website.task.data.entities.TaskGroup;

public record TaskDetailsDTO(
        UUID id,
        String name,
        UUID projectId,
        String color,
        OffsetDateTime startsAt,
        OffsetDateTime endsAt,
        boolean allDay,
        UUID authorId,
        String authorName,
        List<TaskGroup> groups,
        List<TaskCategory> categories,
        String description,
        OffsetDateTime createdAt,
        OffsetDateTime lastUpdate,
        ProjectPermission visibleTo
        ) {

}

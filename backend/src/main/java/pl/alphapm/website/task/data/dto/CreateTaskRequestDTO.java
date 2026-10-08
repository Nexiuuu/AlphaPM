package pl.alphapm.website.task.data.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pl.alphapm.website.global.enums.ProjectPermission;

public record CreateTaskRequestDTO(
        @NotBlank
        @Size(max = 60)
        String name,
        @NotNull
        UUID projectId,
        @NotBlank
        String color,
        @NotNull
        OffsetDateTime startsAt,
        @NotNull
        OffsetDateTime endsAt,
        boolean allDay,
        String description,
        @Size(max = 30)
        @UniqueElements
        List<UUID> groupsIds,
        @Size(max = 30)
        @UniqueElements
        List<UUID> categoryIds,
        @NotNull
        ProjectPermission visibleTo
        ) {

    public CreateTaskRequestDTO {
        startsAt = startsAt.withSecond(0).withNano(0);
        endsAt = endsAt.withSecond(0).withNano(0);
    }
}

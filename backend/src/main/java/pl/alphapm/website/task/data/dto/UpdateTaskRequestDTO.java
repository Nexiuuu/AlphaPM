package pl.alphapm.website.task.data.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.validation.constraints.Size;

public record UpdateTaskRequestDTO(
        @Size(max = 60)
        String name,
        String color,
        OffsetDateTime startsAt,
        OffsetDateTime endsAt,
        Boolean allDay,
        String description,
        @UniqueElements
        List<UUID> groupIds,
        @UniqueElements
        List<UUID> categoryIds
        ) {

    public UpdateTaskRequestDTO {
        if (startsAt != null) {
            startsAt = startsAt.withSecond(0).withNano(0);
        }
        if (endsAt != null) {
            endsAt = endsAt.withSecond(0).withNano(0);
        }
    }
}

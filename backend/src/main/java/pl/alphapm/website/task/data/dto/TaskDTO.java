package pl.alphapm.website.task.data.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record TaskDTO(
        UUID id,
        String name,
        UUID projectId,
        String color,
        OffsetDateTime startsAt,
        OffsetDateTime endsAt,
        boolean allDay
        ) {

}

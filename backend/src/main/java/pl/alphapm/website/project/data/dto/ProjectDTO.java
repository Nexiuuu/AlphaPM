package pl.alphapm.website.project.data.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ProjectDTO(
        UUID id,
        String name,
        String color,
        OffsetDateTime createdAt
        ) {

}

package pl.alphapm.website.project.data.dto;

import java.time.OffsetDateTime;

public record ProjectDTO(
        Long id,
        String name,
        String color,
        OffsetDateTime createdAt
) {}
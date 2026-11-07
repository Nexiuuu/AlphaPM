package pl.alphapm.website.team.data.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record TeamDTO(
        UUID id,
        UUID ownerId,
        String name,
        String description,
        OffsetDateTime createdAt,
        long memberCount,
        List<TeamProjectDTO> projects
) {

}

package pl.alphapm.website.team.data.dto;

import java.util.UUID;

public record TeamProjectDTO(
        UUID id,
        String name,
        String color
) {

}

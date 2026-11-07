package pl.alphapm.website.team.data.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateTeamRequestDTO(
        @NotBlank
        @Size(max = 80)
        String name,

        @Size(max = 500)
        String description,

        @NotNull
        @Size(max = 100)
        List<@NotNull UUID> projectIds
) {

    public CreateTeamRequestDTO {
        projectIds = projectIds == null ? List.of() : projectIds;
    }
}

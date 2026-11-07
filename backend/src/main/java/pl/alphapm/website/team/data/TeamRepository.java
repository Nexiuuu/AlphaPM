package pl.alphapm.website.team.data;

import java.util.List;

import pl.alphapm.website.team.data.dto.CreateTeamRequestDTO;
import pl.alphapm.website.team.data.dto.TeamDTO;

public interface TeamRepository {

    List<TeamDTO> getTeams();

    TeamDTO createTeam(CreateTeamRequestDTO request);
}

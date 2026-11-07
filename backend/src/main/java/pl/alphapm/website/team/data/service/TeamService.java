package pl.alphapm.website.team.data.service;

import java.util.List;

import org.springframework.stereotype.Service;

import pl.alphapm.website.team.data.TeamRepository;
import pl.alphapm.website.team.data.dto.CreateTeamRequestDTO;
import pl.alphapm.website.team.data.dto.TeamDTO;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<TeamDTO> getTeams() {
        return teamRepository.getTeams();
    }

    public TeamDTO createTeam(CreateTeamRequestDTO request) {
        return teamRepository.createTeam(request);
    }
}

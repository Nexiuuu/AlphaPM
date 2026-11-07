package pl.alphapm.website.team.data.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.alphapm.website.team.data.dto.CreateTeamRequestDTO;
import pl.alphapm.website.team.data.dto.TeamDTO;
import pl.alphapm.website.team.data.service.TeamService;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamDTO> getTeams() {
        return teamService.getTeams();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeamDTO createTeam(
            @Valid @RequestBody CreateTeamRequestDTO request
    ) {
        return teamService.createTeam(request);
    }
}

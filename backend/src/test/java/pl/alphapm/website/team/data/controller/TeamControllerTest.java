package pl.alphapm.website.team.data.controller;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import pl.alphapm.website.middleware.RequestIdCounter;
import pl.alphapm.website.team.data.dto.CreateTeamRequestDTO;
import pl.alphapm.website.team.data.dto.TeamDTO;
import pl.alphapm.website.team.data.dto.TeamProjectDTO;
import pl.alphapm.website.team.data.service.TeamService;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(
        controllers = TeamController.class,
        excludeAutoConfiguration = {
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.web.OAuth2ResourceServerWebSecurityAutoConfiguration.class,
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.OAuth2ResourceServerAutoConfiguration.class
        }
)
@ActiveProfiles("test")
class TeamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TeamService teamService;

    @MockitoBean
    private RequestIdCounter requestIdCounter;

    @Test
    void getTeamsReturnsTeamsAndLinkedProjects() throws Exception {
        UUID teamId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();
        TeamDTO team = new TeamDTO(
                teamId,
                UUID.randomUUID(),
                "Product team",
                "Works on the product",
                OffsetDateTime.parse("2026-11-06T12:00:00Z"),
                1,
                List.of(new TeamProjectDTO(projectId, "AlphaPM", "#27F580"))
        );
        when(teamService.getTeams()).thenReturn(List.of(team));

        mockMvc.perform(get("/api/teams"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(teamId.toString()))
                .andExpect(jsonPath("$[0].memberCount").value(1))
                .andExpect(jsonPath("$[0].projects[0].id").value(projectId.toString()))
                .andExpect(jsonPath("$[0].projects[0].name").value("AlphaPM"));

        verify(teamService).getTeams();
    }

    @Test
    void createTeamReturnsCreatedTeam() throws Exception {
        UUID teamId = UUID.randomUUID();
        UUID projectId = UUID.randomUUID();
        CreateTeamRequestDTO request = new CreateTeamRequestDTO(
                "Product team",
                "Works on the product",
                List.of(projectId)
        );
        TeamDTO response = new TeamDTO(
                teamId,
                UUID.randomUUID(),
                request.name(),
                request.description(),
                OffsetDateTime.parse("2026-11-06T12:00:00Z"),
                1,
                List.of(new TeamProjectDTO(projectId, "AlphaPM", "#27F580"))
        );
        when(teamService.createTeam(request)).thenReturn(response);

        mockMvc.perform(post("/api/teams")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(teamId.toString()))
                .andExpect(jsonPath("$.name").value("Product team"))
                .andExpect(jsonPath("$.memberCount").value(1))
                .andExpect(jsonPath("$.projects[0].id").value(projectId.toString()));

        verify(teamService).createTeam(request);
    }

    @Test
    void rejectsBlankTeamName() throws Exception {
        mockMvc.perform(post("/api/teams")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"name":" ","description":"","projectIds":[]}
                    """))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(teamService);
    }
}

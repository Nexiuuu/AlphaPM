package pl.alphapm.website.team.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.team.data.dto.CreateTeamRequestDTO;
import pl.alphapm.website.team.data.dto.TeamDTO;

@Repository
public class SupabaseTeamRepository implements TeamRepository {

    private final RestClient supabaseRestClient;
    private final String publishableKey;

    public SupabaseTeamRepository(
            RestClient supabaseRestClient,
            @Value("${supabase.publishable-key}") String publishableKey
    ) {
        this.supabaseRestClient = supabaseRestClient;
        this.publishableKey = publishableKey;
    }

    private RestClient.RequestHeadersSpec<?> authenticatedRequest(
            RestClient.RequestHeadersSpec<?> request
    ) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken)
                SecurityContextHolder.getContext().getAuthentication();

        return request
                .header("apikey", publishableKey)
                .header("Authorization", "Bearer " + authentication.getToken().getTokenValue());
    }

    @Override
    public List<TeamDTO> getTeams() {
        return authenticatedRequest(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/get_teams")
        )
                .retrieve()
                .body(new ParameterizedTypeReference<List<TeamDTO>>() {
                });
    }

    @Override
    public TeamDTO createTeam(CreateTeamRequestDTO request) {
        return authenticatedRequest(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/create_team")
                        .body(new CreateTeamRpcRequest(
                                request.name(),
                                request.description(),
                                request.projectIds()
                        ))
        )
                .retrieve()
                .body(TeamDTO.class);
    }

    private record CreateTeamRpcRequest(
            String p_name,
            String p_description,
            List<java.util.UUID> p_project_ids
    ) {

    }
}

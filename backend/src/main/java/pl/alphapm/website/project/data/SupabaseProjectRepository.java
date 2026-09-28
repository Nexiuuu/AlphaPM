package pl.alphapm.website.project.data;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.project.data.entities.Project;

@Repository
public class SupabaseProjectRepository implements ProjectRepository {

    private final RestClient supabaseRestClient;
    private final String publishableKey;

    public SupabaseProjectRepository(
            RestClient supabaseRestClient,
            @Value("${supabase.publishable-key}") String publishableKey
    ) {
        this.supabaseRestClient = supabaseRestClient;
        this.publishableKey = publishableKey;
    }

    private String getJwt() {
        JwtAuthenticationToken authentication
                = (JwtAuthenticationToken) SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return authentication.getToken().getTokenValue();
    }

    private RestClient.RequestHeadersSpec<?> authenticate(
            RestClient.RequestHeadersSpec<?> request
    ) {
        return request
                .header("apikey", publishableKey)
                .header("Authorization", "Bearer " + getJwt());
    }

    @Override
    public Project createProject(String name, String color) {
        return authenticate(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/create_project")
                        .body(new CreateProjectRpcRequest(name, color))
        )
                .retrieve()
                .body(Project.class);
    }

    @Override
    public List<Project> getProjects() {
        return authenticate(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/get_projects")
        )
                .retrieve()
                .body(new ParameterizedTypeReference<List<Project>>() {
                });
    }

    @Override
    public Project updateProject(
            UUID projectId,
            String name,
            String color
    ) {
        return authenticate(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/update_project")
                        .body(new UpdateProjectRpcRequest(
                                projectId,
                                name,
                                color
                        ))
        )
                .retrieve()
                .body(Project.class);
    }

    @Override
    public void deleteProject(UUID projectId) {
        authenticate(
                supabaseRestClient
                        .post()
                        .uri("/rest/v1/rpc/delete_project")
                        .body(new DeleteProjectRpcRequest(projectId))
        )
                .retrieve()
                .toBodilessEntity();
    }

    private record CreateProjectRpcRequest(
            String p_name,
            String p_color
            ) {

    }

    private record UpdateProjectRpcRequest(
            UUID p_project_id,
            String p_name,
            String p_color
            ) {

    }

    private record DeleteProjectRpcRequest(
            UUID p_project_id
            ) {

    }
}

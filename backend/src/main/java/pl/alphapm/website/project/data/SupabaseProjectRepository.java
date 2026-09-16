package pl.alphapm.website.project.data;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.project.data.entities.Project;

@Repository
public class SupabaseProjectRepository implements ProjectRepository {

    private final RestClient supabaseRestClient;

    public SupabaseProjectRepository(RestClient supabaseRestClient) {
        this.supabaseRestClient = supabaseRestClient;
    }

    @Override
    public Project createProject(String name, String color) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder
                .getContext().getAuthentication();
        String jwt = authentication.getToken().getTokenValue();

        return supabaseRestClient.post()
                .uri("/rest/v1/rpc/create_project")
                .header("Authorization", "Bearer " + jwt)
                .body(new CreateProjectRpcRequest(name, color))
                .retrieve()
                .body(Project.class);
    }

    @Override
    public List<Project> getProjects() {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder
                .getContext().getAuthentication();
        String jwt = authentication.getToken().getTokenValue();

        return supabaseRestClient.post()
                .uri("/rest/v1/rpc/get_projects")
                .header("Authorization", "Bearer " + jwt)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Project>>() {
                });
    }

    @Override
    public Project updateProject(Long projectId, String name, String color) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder
                .getContext().getAuthentication();
        String jwt = authentication.getToken().getTokenValue();

        return supabaseRestClient.post()
                .uri("/rest/v1/rpc/update_project")
                .header("Authorization", "Bearer " + jwt)
                .body(new UpdateProjectRpcRequest(projectId, name, color))
                .retrieve()
                .body(Project.class);
    }

    @Override
    public void deleteProject(Long projectId) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder
                .getContext().getAuthentication();
        String jwt = authentication.getToken().getTokenValue();

        supabaseRestClient.post()
                .uri("/rest/v1/rpc/delete_project")
                .header("Authorization", "Bearer " + jwt)
                .body(new DeleteProjectRpcRequest(projectId))
                .retrieve()
                .toBodilessEntity();
    }

    private record CreateProjectRpcRequest(String p_name, String p_color) {

    }

    private record UpdateProjectRpcRequest(Long p_project_id, String p_name, String p_color) {

    }

    private record DeleteProjectRpcRequest(Long p_project_id) {

    }
}

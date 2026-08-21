package pl.alphapm.website.project;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    private final RestClient supabaseRestClient;
    private final String supabaseAnonKey;

    public ProjectService(
        RestClient supabaseRestClient,
        @Value("${supabase.anon-key}") String supabaseAnonKey
    ) {
        this.supabaseRestClient = supabaseRestClient;
        this.supabaseAnonKey = supabaseAnonKey;
    }

    public int getTotalProjectsCount(Jwt jwt) {
        List<Map<String, Object>> projects = supabaseRestClient.post()
            .uri("/rest/v1/rpc/get_projects")
            .header("apikey", supabaseAnonKey)
            .header("Authorization", "Bearer " + jwt.getTokenValue())
            .retrieve()
            .body(new ParameterizedTypeReference<List<Map<String, Object>>>() {});

        return projects != null ? projects.size() : 0;
    }
}
package pl.alphapm.website.project.data.service;

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
    private final String supabasePublishableKey;

    public ProjectService(
        RestClient supabaseRestClient,
        @Value("${supabase.publishable-key}") String supabasePublishableKey
    ) {
        this.supabaseRestClient = supabaseRestClient;
        this.supabasePublishableKey = supabasePublishableKey;
    }

    public int getTotalProjectsCount(Jwt jwt) {
        List<Map<String, Object>> projects = supabaseRestClient.post()
            .uri("/rest/v1/rpc/get_projects")
            .header("apikey", supabasePublishableKey)
            .header("Authorization", "Bearer " + jwt.getTokenValue())
            .retrieve()
            .body(new ParameterizedTypeReference<List<Map<String, Object>>>() {});

        return projects != null ? projects.size() : 0;
    }
}
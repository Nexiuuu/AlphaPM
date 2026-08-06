package pl.alphapm.website.user.service;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.user.dto.UserSettingsDTO;

@Service
public class UserSettingsService {

    private final RestClient supabaseRestClient;

    public UserSettingsService(RestClient supabaseRestClient) {
        this.supabaseRestClient = supabaseRestClient;
    }

    public UserSettingsDTO getSettings(String token, String userId) {
        var results = supabaseRestClient.get()
        .uri("/user_settings?select=*")
        .header("Authorization", "Bearer " + token)
        .retrieve()
        .body(new ParameterizedTypeReference<List<UserSettingsDTO>>() { });

        if (results == null || results.isEmpty()) {
            
        }

        if (results.size() > 1) {

        }

        return results.get(0);
    }
}

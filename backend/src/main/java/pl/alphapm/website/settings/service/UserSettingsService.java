package pl.alphapm.website.settings.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.settings.dto.UserSettingsDTO;

@Service
public class UserSettingsService {

    private static final Logger logger = LoggerFactory.getLogger(UserSettingsService.class);

    private static final int MAX_RETRIES = 3;

    private final RestClient supabaseRestClient;

    public UserSettingsService(RestClient supabaseRestClient) {
        this.supabaseRestClient = supabaseRestClient;
    }

    public UserSettingsDTO getSettings() {
        return UserSettingsDTO.defaults();
    }

    public UserSettingsDTO getSettings(String token, String userId) {
        if (token == null || userId == null)
            return getSettings();


        UserSettingsDTO result = null;
        for (int attempt = 0; attempt < MAX_RETRIES; ++attempt) {
            try {
                result = supabaseRestClient.post()
                    .uri("/rest/v1/rpc/get_user_settings")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .body(UserSettingsDTO.class);
                
            } catch (Exception e) {
                logger.atError()
                .addKeyValue("userId", userId)
                .addKeyValue("by", "UserSettingsService.getSettings()")
                .log("Error occurs: " + e.toString());

                // Thread.sleep(100L); TODO: wait some miliseconds before retry
                continue;
            }

            if (result == null) {
                result = UserSettingsDTO.defaults();
                logger.atInfo()
                .addKeyValue("userId", userId)
                .addKeyValue("by", "UserSettingsService.getSettings()")
                .log("Settings not found, create new with defaults parameters");
            }
            break;
        }
        return result;
    }

    public boolean setSettings(String token, String userId, UserSettingsDTO settings) {
        if (token == null || userId == null)
            return false;

        try {
            supabaseRestClient.post()
            .uri("/rest/v1/rpc/set_user_settings")
            .header("Authorization", "Bearer " + token)
            .body(Map.of(
                "new_settings", settings
            ))
            .retrieve()
            .body(UserSettingsDTO.class);
            
        } catch (Exception e) {
            logger.atError()
            .addKeyValue("userId", userId)
            .addKeyValue("by", "UserSettingsService.setSettings()")
            .log("Error occurs: " + e.toString());
            return false;
        }

        return true;
    }
}

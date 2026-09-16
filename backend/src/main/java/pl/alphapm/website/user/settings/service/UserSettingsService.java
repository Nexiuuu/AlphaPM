package pl.alphapm.website.user.settings.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.user.settings.dto.UserSettingsDTO;
import pl.alphapm.website.user.settings.exceptions.UserSettingsUnavailableException;

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
        if (token == null || userId == null) {
            return getSettings();
        }

        for (int attempt = 0; attempt < MAX_RETRIES; ++attempt) {
            try {
                UserSettingsDTO result = supabaseRestClient.post()
                        .uri("/rest/v1/rpc/get_user_settings")
                        .header("Authorization", "Bearer " + token)
                        .retrieve()
                        .body(UserSettingsDTO.class);

                if (result == null) {
                    logger.atInfo()
                            .addKeyValue("userId", userId)
                            .addKeyValue("by", "UserSettingsService.getSettings()")
                            .log("Settings not found, using defaults");

                    return UserSettingsDTO.defaults();
                }

                return result;

            } catch (Exception e) {
                logger.atError()
                        .addKeyValue("userId", userId)
                        .addKeyValue("attempt", attempt + 1)
                        .addKeyValue("by", "UserSettingsService.getSettings()")
                        .log("Error while retrieving settings: {}", e.toString());
            }
        }

        throw new UserSettingsUnavailableException();
    }

    public boolean setSettings(String token, String userId, UserSettingsDTO settings) {
        if (token == null || userId == null) {
            return false;
        }

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

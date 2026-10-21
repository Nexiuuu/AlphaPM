package pl.alphapm.website.user.settings;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.user.settings.dto.UserSettingsDTO;

@Repository
public class SupabaseSettingRepository {

    private final RestClient supabaseRestClient;

    public SupabaseSettingRepository(RestClient supabaseRestClient) {
        this.supabaseRestClient = supabaseRestClient;
    }

    public UserSettingsDTO findByUserId(UUID userId) {
        List<Map<String, Object>> rows = supabaseRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/v1/user_settings")
                        .queryParam(
                                "select",
                                "theme,language,notification_preference,time_zone"
                        )
                        .queryParam("user_id", "eq." + userId)
                        .build())
                .header("Accept-Profile", "private")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

        if (rows == null || rows.isEmpty()) {
            return null;
        }

        Map<String, Object> row = rows.get(0);

        return new UserSettingsDTO(
                pl.alphapm.website.user.settings.enums.Theme.valueOf(
                        row.get("theme").toString().toUpperCase()
                ),
                pl.alphapm.website.user.settings.enums.Language.valueOf(
                        row.get("language").toString().toUpperCase()
                ),
                pl.alphapm.website.user.settings.enums.NotificationPreference.valueOf(
                        row.get("notification_preference").toString().toUpperCase()
                ),
                row.get("time_zone").toString()
        );
    }

    public void save(UUID userId, UserSettingsDTO settings) {
        Map<String, Object> body = Map.of(
                "user_id", userId,
                "theme", settings.theme().name().toLowerCase(),
                "language", settings.language().name().toLowerCase(),
                "notification_preference",
                settings.notificationPreference().name().toLowerCase(),
                "time_zone", settings.timeZone()
        );

        supabaseRestClient.post()
                .uri("/rest/v1/user_settings")
                .header("Content-Profile", "private")
                .header("Prefer", "resolution=merge-duplicates,return=minimal")
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }
}

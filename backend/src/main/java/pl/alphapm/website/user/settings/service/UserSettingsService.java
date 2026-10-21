package pl.alphapm.website.user.settings.service;

import java.time.DateTimeException;
import java.time.ZoneId;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import pl.alphapm.website.user.settings.SupabaseSettingRepository;
import pl.alphapm.website.user.settings.dto.UserSettingsDTO;

@Service
public class UserSettingsService {

    private static final Logger logger
            = LoggerFactory.getLogger(UserSettingsService.class);

    private final SupabaseSettingRepository repository;

    public UserSettingsService(
            SupabaseSettingRepository repository
    ) {
        this.repository = repository;
    }

    public UserSettingsDTO getSettings() {
        return UserSettingsDTO.defaults();
    }

    public UserSettingsDTO getSettings(String userId) {
        if (userId == null) {
            return getSettings();
        }

        UUID id = UUID.fromString(userId);

        UserSettingsDTO settings = repository.findByUserId(id);

        if (settings == null) {
            logger.atInfo()
                    .addKeyValue("userId", userId)
                    .log("Settings not found, using defaults");

            return getSettings();
        }

        return settings;
    }

    public boolean setSettings(
            String userId,
            UserSettingsDTO settings
    ) {
        if (userId == null || settings == null) {
            return false;
        }

        try {
            UUID id = UUID.fromString(userId);

            if (settings.theme() == null
                    || settings.language() == null
                    || settings.notificationPreference() == null
                    || settings.timeZone() == null) {
                return false;
            }

            ZoneId.of(settings.timeZone());

            repository.save(id, settings);
            return true;

        } catch (DateTimeException e) {
            logger.warn(
                    "Invalid time zone supplied for user {}",
                    userId
            );
            return false;

        } catch (Exception e) {
            logger.atError()
                    .addKeyValue("userId", userId)
                    .log(
                            "Error while saving user settings: {}",
                            e.toString()
                    );
            return false;
        }
    }
}

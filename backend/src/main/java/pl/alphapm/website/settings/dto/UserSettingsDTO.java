package pl.alphapm.website.settings.dto;

import pl.alphapm.website.settings.enums.Language;
import pl.alphapm.website.settings.enums.NotificationPreference;
import pl.alphapm.website.settings.enums.Theme;

public record UserSettingsDTO (
    Theme theme,
    Language language,
    NotificationPreference notificationPreference
) {
    public static UserSettingsDTO defaults() {
        return new UserSettingsDTO(
            Theme.DARK,
            Language.POLISH,
            NotificationPreference.MEDIUM
        );
    }

}

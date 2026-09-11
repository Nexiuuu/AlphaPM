package pl.alphapm.website.user.settings.dto;

import pl.alphapm.website.user.settings.enums.Language;
import pl.alphapm.website.user.settings.enums.NotificationPreference;
import pl.alphapm.website.user.settings.enums.Theme;

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

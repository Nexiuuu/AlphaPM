package pl.alphapm.website.user.dto;

import pl.alphapm.website.user.enums.Language;
import pl.alphapm.website.user.enums.NotificationPreference;
import pl.alphapm.website.user.enums.Theme;

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

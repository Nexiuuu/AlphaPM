package pl.alphapm.website.user.settings.exceptions;

public class UserSettingsUnavailableException extends RuntimeException {

    public UserSettingsUnavailableException() {
        super("User settings are currently unavailable");
    }
}

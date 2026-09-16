package pl.alphapm.website.user.settings.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import pl.alphapm.website.user.settings.exceptions.UserSettingsUnavailableException;

@RestControllerAdvice
public class UserSettingsExceptionHandler {

    @ExceptionHandler(UserSettingsUnavailableException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public void handleUserSettingsUnavailable() {
    }
}

package pl.alphapm.website.user.settings.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import pl.alphapm.website.user.settings.dto.UserSettingsDTO;
import pl.alphapm.website.user.settings.service.UserSettingsService;

@RestController
@RequestMapping("/api/me/settings")
public class UserSettingsController {

    private final UserSettingsService service;

    public UserSettingsController(UserSettingsService service) {
        this.service = service;
    }

    @GetMapping
    public UserSettingsDTO getSettings(
            @AuthenticationPrincipal Jwt jwt
    ) {
        return service.getSettings(jwt.getSubject());
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void setSettings(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UserSettingsDTO settings
    ) {
        boolean success = service.setSettings(
                jwt.getSubject(),
                settings
        );

        if (!success) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid user settings"
            );
        }
    }
}

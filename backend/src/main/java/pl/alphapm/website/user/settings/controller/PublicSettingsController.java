package pl.alphapm.website.user.settings.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.alphapm.website.user.settings.dto.UserSettingsDTO;

@RestController
@RequestMapping("/api/public/settings")
public class PublicSettingsController {

    @GetMapping
    public UserSettingsDTO getSettings() {
        return UserSettingsDTO.defaults();
    }
}

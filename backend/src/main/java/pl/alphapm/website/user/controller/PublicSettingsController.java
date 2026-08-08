package pl.alphapm.website.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.alphapm.website.user.dto.UserSettingsDTO;

@RestController
@RequestMapping("/public/user/settings")
public class PublicSettingsController {

    @GetMapping
    public UserSettingsDTO getSettings() {
        return UserSettingsDTO.defaults();
    }
}

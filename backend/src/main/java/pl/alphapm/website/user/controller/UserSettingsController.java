package pl.alphapm.website.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.alphapm.website.user.service.UserSettingsService;


@RestController
@RequestMapping("/api/user/settings")
public class UserSettingsController {

    private final UserSettingsService service;

    public UserSettingsController(UserSettingsService service) {
        this.service = service;
    }

    // @GetMapping
    // public UserSettingsDTO getSettings(@AuthenticationPrincipal Jwt jwt) {
    //     UserSettingsDTO settings = service.get
        
    // }
    
}

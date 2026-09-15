package pl.alphapm.website.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootRedirectController {

    @GetMapping("/")
    public String redirectToFrontend() {
        return "redirect:https://nexiuuu.github.io/AlphaPM/";
    }
}
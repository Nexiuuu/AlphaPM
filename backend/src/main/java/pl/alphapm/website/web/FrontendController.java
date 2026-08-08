package pl.alphapm.website.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class FrontendController {

    @GetMapping("/")
    public String index() {
        return "forward:/frontend/index.html";
    }
}
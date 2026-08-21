package pl.alphapm.website.project;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/count")
    public ProjectCountDTO getProjectsCount(@AuthenticationPrincipal Jwt jwt) {
        int total = projectService.getTotalProjectsCount(jwt);
        return new ProjectCountDTO(total);
    }
}
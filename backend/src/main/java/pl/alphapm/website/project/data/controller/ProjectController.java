package pl.alphapm.website.project.data.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.alphapm.website.project.data.dto.CreateProjectRequestDTO;
import pl.alphapm.website.project.data.dto.ProjectDTO;
import pl.alphapm.website.project.data.dto.UpdateProjectRequestDTO;
import pl.alphapm.website.project.data.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDTO> getProjects() {
        return projectService.getProjects();
    }

    @PostMapping
    public ProjectDTO createProject(
            @Valid @RequestBody CreateProjectRequestDTO request
    ) {
        return projectService.createProject(request);
    }

    @PatchMapping("/{projectId}")
    public ProjectDTO updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody UpdateProjectRequestDTO request
    ) {
        return projectService.updateProject(
                projectId,
                request.name(),
                request.color()
        );
    }

    @DeleteMapping("/{projectId}")
    public void deleteProject(
            @PathVariable Long projectId
    ) {
        projectService.deleteProject(projectId);
    }
}

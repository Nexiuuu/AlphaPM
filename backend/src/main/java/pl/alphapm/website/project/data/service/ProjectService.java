package pl.alphapm.website.project.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import pl.alphapm.website.project.data.ProjectRepository;
import pl.alphapm.website.project.data.dto.CreateProjectRequestDTO;
import pl.alphapm.website.project.data.dto.ProjectDTO;
import pl.alphapm.website.project.data.entities.Project;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(
        RestClient supabaseRestClient,
        @Value("${supabase.publishable-key}") String supabasePublishableKey,
        ProjectRepository projectRepository
    ) {
        this.projectRepository = projectRepository;
    }

    public ProjectDTO createProject(CreateProjectRequestDTO request) {

        Project project = projectRepository.createProject(
            request.name(),
            request.color()
        );

        return new ProjectDTO(
            project.getId(),
            project.getName(),
            project.getColor(),
            project.getCreatedAt()
        );
    }

    public List<ProjectDTO> getProjects() {

    return projectRepository.getProjects()
        .stream()
        .map(project -> new ProjectDTO(
            project.getId(),
            project.getName(),
            project.getColor(),
            project.getCreatedAt()
        ))
        .toList();
    }
}
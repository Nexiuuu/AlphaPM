package pl.alphapm.website.project.data;

import java.util.List;
import java.util.UUID;

import pl.alphapm.website.project.data.entities.Project;

public interface ProjectRepository {

    Project createProject(String name, String color);

    List<Project> getProjects();

    void deleteProject(UUID projectId);

    Project updateProject(UUID projectId, String name, String color);
}

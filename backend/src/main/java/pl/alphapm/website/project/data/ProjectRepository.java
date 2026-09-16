package pl.alphapm.website.project.data;

import java.util.List;

import pl.alphapm.website.project.data.entities.Project;

public interface ProjectRepository {

    Project createProject(String name, String color);

    List<Project> getProjects();

    void deleteProject(Long projectId);

    Project updateProject(Long projectId, String name, String color);
}

package pl.alphapm.website.project.data.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import pl.alphapm.website.project.data.ProjectRepository;
import pl.alphapm.website.project.data.dto.CreateProjectRequestDTO;
import pl.alphapm.website.project.data.dto.ProjectDTO;
import pl.alphapm.website.project.data.entities.Project;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void getProjectsTest() {
        UUID id = UUID.randomUUID();
        UUID ownerId = UUID.randomUUID();
        OffsetDateTime createdAt = OffsetDateTime.parse("2026-10-29T12:00:00Z");

        Project project = new Project(
                id, ownerId, "Test project", "#FF0000", createdAt
        );

        when(projectRepository.getProjects())
                .thenReturn(List.of(project));

        List<ProjectDTO> result = projectService.getProjects();

        assertEquals(1, result.size());
        assertEquals(id, result.get(0).id());
        assertEquals("Test project", result.get(0).name());
        assertEquals("#FF0000", result.get(0).color());

        verify(projectRepository).getProjects();
    }

    @Test
    void createProjectTest() {
        UUID id = UUID.randomUUID();
        UUID ownerId = UUID.randomUUID();
        OffsetDateTime createdAt = OffsetDateTime.parse("2026-10-29T12:00:00Z");

        when(projectRepository.createProject("Test project", "#FF0000"))
                .thenReturn(new Project(
                        id, ownerId, "Test project", "#FF0000", createdAt
                ));

        ProjectDTO result = projectService.createProject(
                new CreateProjectRequestDTO("Test project", "#FF0000")
        );

        assertEquals(id, result.id());
        assertEquals("Test project", result.name());
        assertEquals("#FF0000", result.color());

        verify(projectRepository).createProject("Test project", "#FF0000");
    }

    @Test
    void deleteProjectTest() {
        UUID projectId = UUID.randomUUID();

        projectService.deleteProject(projectId);

        verify(projectRepository).deleteProject(projectId);
    }
}

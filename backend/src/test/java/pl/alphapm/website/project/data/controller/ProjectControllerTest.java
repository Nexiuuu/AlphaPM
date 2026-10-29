package pl.alphapm.website.project.data.controller;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import pl.alphapm.website.middleware.RequestIdCounter;
import pl.alphapm.website.project.data.dto.CreateProjectRequestDTO;
import pl.alphapm.website.project.data.dto.ProjectDTO;
import pl.alphapm.website.project.data.dto.UpdateProjectRequestDTO;
import pl.alphapm.website.project.data.service.ProjectService;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(
        controllers = ProjectController.class,
        excludeAutoConfiguration = {
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.web.OAuth2ResourceServerWebSecurityAutoConfiguration.class,
            org.springframework.boot.security.oauth2.server.resource.autoconfigure.OAuth2ResourceServerAutoConfiguration.class
        }
)
@ActiveProfiles("test")
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProjectService projectService;

    @MockitoBean
    private RequestIdCounter requestIdCounter;

    @Test
    void getProjectsTest() throws Exception {
        when(projectService.getProjects()).thenReturn(List.of());

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(projectService).getProjects();
    }

    @Test
    void createProjectTest() throws Exception {
        CreateProjectRequestDTO request = new CreateProjectRequestDTO("Test project", "#FF0000");

        ProjectDTO response = new ProjectDTO(
                UUID.randomUUID(),
                "Test project",
                "#FF0000",
                OffsetDateTime.parse("2026-10-29T12:00:00Z")
        );

        when(projectService.createProject(request)).thenReturn(response);

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test project"))
                .andExpect(jsonPath("$.color").value("#FF0000"));

        verify(projectService).createProject(request);
    }

    @Test
    void rejectBlankProjectNameTest() throws Exception {
        CreateProjectRequestDTO request = new CreateProjectRequestDTO(" ", "#FF0000");

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(projectService);
    }

    @Test
    void rejectInvalidProjectColorTest() throws Exception {
        CreateProjectRequestDTO request = new CreateProjectRequestDTO("Test project", "red");

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(projectService);
    }

    @Test
    void updateProjectPartiallyTest() throws Exception {
        UUID projectId = UUID.randomUUID();

        UpdateProjectRequestDTO request = new UpdateProjectRequestDTO("Renamed project", null);

        ProjectDTO response = new ProjectDTO(
                projectId,
                "Renamed project",
                "#FF0000",
                OffsetDateTime.parse("2026-10-29T12:00:00Z")
        );

        when(projectService.updateProject(
                projectId, "Renamed project", null
        )).thenReturn(response);

        mockMvc.perform(patch("/api/projects/{projectId}", projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Renamed project"))
                .andExpect(jsonPath("$.color").value("#FF0000"));

        verify(projectService).updateProject(
                projectId, "Renamed project", null
        );
    }

    @Test
    void deleteProjectTest() throws Exception {
        UUID projectId = UUID.randomUUID();

        mockMvc.perform(delete("/api/projects/{projectId}", projectId))
                .andExpect(status().isOk());

        verify(projectService).deleteProject(projectId);
    }
}

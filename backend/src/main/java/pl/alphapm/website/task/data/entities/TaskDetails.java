package pl.alphapm.website.task.data.entities;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import pl.alphapm.website.global.enums.ProjectPermission;

public class TaskDetails {

    private UUID id;
    private String name;

    @JsonProperty("author_id")
    private UUID authorId;

    private String authorName;

    @JsonProperty("project_id")
    private UUID projectId;

    private String color;

    @JsonProperty("starts_at")
    private OffsetDateTime startsAt;

    @JsonProperty("ends_at")
    private OffsetDateTime endsAt;

    @JsonProperty("all_day")
    private boolean allDay;

    private List<TaskGroup> groups;
    private List<TaskCategory> categories;

    private String description;

    @JsonProperty("created_at")
    private OffsetDateTime createdAt;

    @JsonProperty("last_update")
    private OffsetDateTime lastUpdate;

    @JsonProperty("visible_to")
    private ProjectPermission visibleTo;

    public TaskDetails(
            UUID id,
            String name,
            UUID authorId,
            String authorName,
            UUID projectId,
            String color,
            OffsetDateTime startsAt,
            OffsetDateTime endsAt,
            boolean allDay,
            List<TaskGroup> groups,
            List<TaskCategory> categories,
            String description,
            OffsetDateTime createdAt,
            OffsetDateTime lastUpdate,
            ProjectPermission visibleTo
    ) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.authorName = authorName;
        this.projectId = projectId;
        this.color = color;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.allDay = allDay;
        this.groups = groups;
        this.categories = categories;
        this.description = description;
        this.createdAt = createdAt;
        this.lastUpdate = lastUpdate;
        this.visibleTo = visibleTo;
    }

    protected TaskDetails() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getAuthorId() {
        return authorId;
    }

    public void setAuthorId(UUID authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public OffsetDateTime getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(OffsetDateTime startsAt) {
        this.startsAt = startsAt;
    }

    public OffsetDateTime getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(OffsetDateTime endsAt) {
        this.endsAt = endsAt;
    }

    public boolean isAllDay() {
        return allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public List<TaskGroup> getGroups() {
        return groups;
    }

    public void setGroups(List<TaskGroup> groups) {
        this.groups = groups;
    }

    public List<TaskCategory> getCategories() {
        return categories;
    }

    public void setCategories(List<TaskCategory> categories) {
        this.categories = categories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(OffsetDateTime lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public ProjectPermission getVisibleTo() {
        return visibleTo;
    }

    public void setVisibleTo(ProjectPermission visibleTo) {
        this.visibleTo = visibleTo;
    }
}

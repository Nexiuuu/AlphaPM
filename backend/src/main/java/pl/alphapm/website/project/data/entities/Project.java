package pl.alphapm.website.project.data.entities;

import java.time.OffsetDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Project {

    private Long id;

    @JsonProperty("owner_id")
    private UUID userId;
    private String name;
    private String color;

    @JsonProperty("created_at")
    private OffsetDateTime createdAt;

    public Project(
            Long id,
            UUID userId,
            String name,
            String color,
            OffsetDateTime createdAt
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.color = color;
        this.createdAt = createdAt;
    }

    protected Project() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
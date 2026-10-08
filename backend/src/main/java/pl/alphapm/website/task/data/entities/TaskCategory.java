package pl.alphapm.website.task.data.entities;

import java.util.UUID;

public class TaskCategory {

    private UUID id;
    private String name;
    private String color;
    private String description;

    public TaskCategory(
            UUID id,
            String name,
            String color,
            String description
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.description = description;
    }

    protected TaskCategory() {
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

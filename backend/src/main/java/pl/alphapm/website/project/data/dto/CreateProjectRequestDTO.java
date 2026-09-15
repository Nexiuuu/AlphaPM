package pl.alphapm.website.project.data.dto;

import java.util.Locale;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateProjectRequestDTO (
    @NotBlank 
    @Size(max=100) 
    String name,
    
    @NotBlank 
    @Pattern(regexp="^#[0-9A-Fa-f]{6}$")
    String color // in #RRGGBB
) {
    public CreateProjectRequestDTO {
        color = color.toUpperCase(Locale.ROOT);
    }
}

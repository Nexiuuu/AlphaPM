package pl.alphapm.website.global.enums;

public enum ProjectPermission {

    SPECTATOR("spectator"),
    MEMBER("member"),
    ADMIN("admin"),
    OWNER("owner");

    private final String value;

    ProjectPermission(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

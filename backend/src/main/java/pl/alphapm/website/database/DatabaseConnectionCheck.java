package pl.alphapm.website.database;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseConnectionCheck {

    private final JdbcTemplate jdbcTemplate;

    @Bean
    @Profile("!test")
    ApplicationRunner checkDatabaseOnStartup() {
        return args -> checkConnection();
    }

    public DatabaseConnectionCheck(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void checkConnection() {
        Integer result = jdbcTemplate.queryForObject(
                "SELECT 1",
                Integer.class
        );

        if (!Integer.valueOf(1).equals(result)) {
            throw new IllegalStateException(
                    "Database connection test failed"
            );
        }
    }
}

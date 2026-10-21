package pl.alphapm.website.database;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseConnectionCheck {

    @Bean
    ApplicationRunner checkDatabaseConnection(
            JdbcTemplate jdbcTemplate) {

        return args -> {
            Integer result = jdbcTemplate.queryForObject(
                    "SELECT 1",
                    Integer.class
            );

            if (!Integer.valueOf(1).equals(result)) {
                throw new IllegalStateException(
                        "Database connection test failed"
                );
            }

            System.out.println("JDBC connection successful");
        };
    }
}

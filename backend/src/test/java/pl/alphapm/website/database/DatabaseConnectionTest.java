package pl.alphapm.website.database;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class DatabaseConnectionTest {

    @Autowired
    private DatabaseConnectionCheck databaseConnectionCheck;

    @Test
    void shouldConnectToDatabase() {
        databaseConnectionCheck.checkConnection();
    }
}

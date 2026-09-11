package pl.alphapm.website.middleware;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import jakarta.annotation.PreDestroy;

@Component
public class RequestIdCounter {
    private static final int MIN_INCREMENT = 8;
    private static final int MAX_INCREMENT = 33;

    private static final Path COUNTER_FILE =
        Paths.get("backend", "logs", "request-counter.txt");

    private static final Logger log =
        LoggerFactory.getLogger(RequestIdCounter.class);

    private final AtomicLong counter;

    public RequestIdCounter() {
        this.counter = new AtomicLong(loadCounter());
    }

    public long next() {
        int increment = ThreadLocalRandom.current()
            .nextInt(MIN_INCREMENT, MAX_INCREMENT + 1); // Prevent request IDs from revealing the exact request count

        return counter.addAndGet(increment);
    }

    @Scheduled(fixedRate = 5000)
    public void periodicSave() {
        save(counter.get());
    }

    @PreDestroy
    public void shutdownSave() {
        save(counter.get());
    }

    private long loadCounter() {
        try {
            if (!Files.exists(COUNTER_FILE)) {
                return 0;
            }

            String value = Files.readString(COUNTER_FILE).trim();

            if (value.isEmpty()) {
                return 0;
            }

            return Long.parseLong(value);

        } catch (IOException | NumberFormatException e) {
            throw new IllegalStateException(
                "Could not load request counter",
                e
            );
        }
    }

    private void save(long value) {
        try {
            Files.createDirectories(COUNTER_FILE.getParent());
            Files.writeString(COUNTER_FILE, String.valueOf(value));

        } catch (IOException e) {
            log.error("Could not save request counter", e);
        }
    }
}
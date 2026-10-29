package pl.alphapm.website.middleware;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestIdFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger("REQUESTS");

    private final RequestIdCounter counter;

    private final Environment environment;

    public RequestIdFilter(
            RequestIdCounter counter,
            Environment environment
    ) {
        this.counter = counter;
        this.environment = environment;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        if (environment.matchesProfiles("test")) {
            response.setHeader("Request-ID", "test-0");
            filterChain.doFilter(request, response);
            return;
        }

        long requestId = counter.next();
        long start = System.currentTimeMillis();

        response.setHeader("Request-ID", String.valueOf(requestId));

        String userId = "anonymous";

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            userId = jwtAuth.getToken().getSubject();
        }

        log.info(
                "REQUEST #{}; user={}; in; {} {}",
                requestId,
                userId,
                request.getMethod(),
                request.getRequestURI()
        );

        try {
            filterChain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - start;

            log.info(
                    "REQUEST #{}; user={}; out; {} ({}ms)",
                    requestId,
                    userId,
                    response.getStatus(),
                    duration
            );
        }
    }
}

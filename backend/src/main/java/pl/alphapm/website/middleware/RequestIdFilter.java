package pl.alphapm.website.middleware;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestIdFilter extends OncePerRequestFilter {
    private final AtomicLong counter = new AtomicLong(0);

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        long requestId = counter.incrementAndGet();
        
        long start = System.currentTimeMillis();
        
        response.setHeader("Request-ID", String.valueOf(requestId));
        
        System.out.println(
            "REQUEST #" + requestId +
            "; in; " + request.getMethod() +
            " " + request.getRequestURI()
        );
        try {
          filterChain.doFilter(request, response);  
        } finally {
            long duration = System.currentTimeMillis()-start;

            System.out.println(
                "REQUEST #" + requestId + 
                "; out; " + response.getStatus() +
                " (" + duration + "ms)"
            );
        }
    }
}

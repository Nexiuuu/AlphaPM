package pl.alphapm.website.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class SupabaseConfig {

    @Bean
    public RestClient supabaseRestClient(
        @Value("${supabase.url}") String supabaseUrl,
        @Value("${supabase.service-role-key}") String serviceRoleKey
    ) {
        return RestClient.builder()
            .baseUrl(supabaseUrl)
            .defaultHeader("apikey", serviceRoleKey)
            .build();
    }
}
package pl.alphapm.website.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class SupabaseConfig {
    
    @Bean
    public RestClient supbabaRestClient(
        @Value("${https://lgplkntgjzmrmasdhbqi.supabase.co}") String supabaseurl
    ) {
        return RestClient.builder().baseUrl(supabaseurl).build();
    }
}

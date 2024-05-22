package kedinet.kedinet.config;

import kedinet.kedinet.converter.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // This allows configuring CORS for all paths
                .allowedOrigins("http://localhost:3000") // Specify the URL of the React application
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed headers
                .allowCredentials(true); // This varies based on your need
    }
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToSizeListConverter());
        registry.addConverter(new StringToBreedListConverter());
        registry.addConverter(new StringToCanLiveWithListConverter());
        registry.addConverter(new StringToCoatLengthListConverter());
        registry.addConverter(new StringToColorListConverter());
        registry.addConverter(new StringToGenderListConverter());
        registry.addConverter(new StringToRegionListConverter());
    }
}

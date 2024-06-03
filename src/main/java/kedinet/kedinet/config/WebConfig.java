package kedinet.kedinet.config;

import kedinet.kedinet.converter.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    // need converters since these classes are enums
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

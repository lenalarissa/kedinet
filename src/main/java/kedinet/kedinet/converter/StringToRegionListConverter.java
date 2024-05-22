package kedinet.kedinet.converter;


import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import kedinet.kedinet.model.enums.Region;

@Component
public class StringToRegionListConverter implements Converter<String, List<Region>> {
    @Override
    public List<Region> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(Region::valueOf)
                .collect(Collectors.toList());
    }
}
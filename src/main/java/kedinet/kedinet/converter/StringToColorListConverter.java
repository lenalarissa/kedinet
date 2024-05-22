package kedinet.kedinet.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import kedinet.kedinet.model.enums.Color;

@Component
public class StringToColorListConverter implements Converter<String, List<Color>> {
    @Override
    public List<Color> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(Color::valueOf)
                .collect(Collectors.toList());
    }
}
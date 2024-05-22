package kedinet.kedinet.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import kedinet.kedinet.model.enums.CoatLength;

@Component
public class StringToCoatLengthListConverter implements Converter<String, List<CoatLength>> {
    @Override
    public List<CoatLength> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(CoatLength::valueOf)
                .collect(Collectors.toList());
    }
}
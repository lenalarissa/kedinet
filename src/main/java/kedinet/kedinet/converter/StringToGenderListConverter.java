package kedinet.kedinet.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import kedinet.kedinet.model.enums.Gender;


@Component
public class StringToGenderListConverter implements Converter<String, List<Gender>> {
    @Override
    public List<Gender> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(Gender::valueOf)
                .collect(Collectors.toList());
    }
}
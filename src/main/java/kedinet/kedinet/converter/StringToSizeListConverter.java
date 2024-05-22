package kedinet.kedinet.converter;

import kedinet.kedinet.model.enums.Size;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StringToSizeListConverter implements Converter<String, List<Size>> {
    @Override
    public List<Size> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(Size::valueOf)
                .collect(Collectors.toList());
    }
}

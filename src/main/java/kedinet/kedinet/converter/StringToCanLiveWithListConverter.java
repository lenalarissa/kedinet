package kedinet.kedinet.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import kedinet.kedinet.model.enums.CanLiveWith;

@Component
public class StringToCanLiveWithListConverter implements Converter<String, List<CanLiveWith>> {
    @Override
    public List<CanLiveWith> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(CanLiveWith::valueOf)
                .collect(Collectors.toList());
    }
}
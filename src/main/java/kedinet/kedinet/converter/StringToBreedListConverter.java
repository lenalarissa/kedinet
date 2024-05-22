package kedinet.kedinet.converter;
import kedinet.kedinet.model.enums.Breed;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StringToBreedListConverter implements Converter<String, List<Breed>> {
    @Override
    public List<Breed> convert(String source) {
        return Arrays.stream(source.split(","))
                .map(String::trim)
                .map(Breed::valueOf)
                .collect(Collectors.toList());
    }
}
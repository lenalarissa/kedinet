package kedinet.kedinet.service;

import kedinet.kedinet.dto.CatDTO;
import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.Image;
import kedinet.kedinet.model.enums.*;
import kedinet.kedinet.repository.CatRepo;
import kedinet.kedinet.repository.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CatService {

    @Autowired
    private CatRepo catRepo;

    @Autowired
    private ImageRepo imageRepo;

    public List<CatDTO> getFilteredCats(Integer ageFrom, Integer ageTo, List<Breed> breeds, List<CanLiveWith> canLiveWithList, List<CoatLength> coatLengths, List<Color> colors, List<Gender> genders, Boolean isIndoorCat, List<Region> regions, List<Size> sizes) {
        List<Cat> cats = catRepo.findFilteredCats(ageFrom, ageTo, breeds, canLiveWithList, coatLengths, colors, genders, isIndoorCat, regions, sizes);

        return cats.stream().map(cat -> {
            Set<String> imageNames = imageRepo.findByCatId(cat.getId()).stream()
                    .map(Image::getName)
                    .collect(Collectors.toSet());
            return new CatDTO(cat, imageNames);
        }).collect(Collectors.toList());
    }
}
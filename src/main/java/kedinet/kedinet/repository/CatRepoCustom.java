package kedinet.kedinet.repository;

import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.enums.*;

import java.util.List;

public interface CatRepoCustom {
    List<Cat> findFilteredCats(Integer ageFrom, Integer ageTo, List<Breed> breeds, List<CanLiveWith> canLiveWithList, List<CoatLength> coatLengths, List<Color> colors, List<Gender> genders, Boolean isIndoorCat, List<Region> regions, List<Size> sizes);
}

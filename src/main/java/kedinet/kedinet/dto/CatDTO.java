package kedinet.kedinet.dto;

import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CatDTO {
    private Integer id;
    private String name;
    private Breed breed;
    private Gender gender;
    private String about;
    private Integer age;
    private Boolean isIndoorCat;
    private Size size;
    private CoatLength coatLength;
    private CanLiveWith canLiveWith;
    private Color color;
    private String disease;
    private Set<String> imageNames;
    private ShelterDTO shelter;
    private LocalDate dateAdded;

    public CatDTO(Cat cat, Set<String> imageNames) {
        this.id = cat.getId();
        this.name = cat.getName();
        this.breed = cat.getBreed();
        this.gender = cat.getGender();
        this.about = cat.getAbout();
        this.age = cat.getAge();
        this.isIndoorCat = cat.getIsIndoorCat();
        this.size = cat.getSize();
        this.coatLength = cat.getCoatLength();
        this.canLiveWith = cat.getCanLiveWith();
        this.color = cat.getColor();
        this.disease = cat.getDisease();
        this.imageNames = imageNames;
        this.shelter = cat.getShelter() != null ? new ShelterDTO(cat.getShelter()) : null;
        this.dateAdded = cat.getDateAdded();
    }
}

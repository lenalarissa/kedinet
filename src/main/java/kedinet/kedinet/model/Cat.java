package kedinet.kedinet.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import kedinet.kedinet.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cats")
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Breed breed;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private String about;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Boolean isIndoorCat;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Size size;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CoatLength coatLength;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CanLiveWith canLiveWith;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Color color;

    @Column
    private String disease;

/*    @Column(nullable = false)
    private Integer shelterId;

    // TODO: TEST
    // this does not work
    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;*/

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shelter_id")
    @JsonManagedReference
    private Shelter shelter;

    @ManyToMany(mappedBy = "favCats")
    private Set<User> user;

    @OneToMany
    @JoinColumn(name = "catId")
    private Set<Image> images;
}

package kedinet.kedinet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import kedinet.kedinet.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shelter_id")
    @JsonManagedReference("shelter-cats")
    private Shelter shelter;

    @ManyToMany(mappedBy = "favCats")
    @JsonIgnore
    private Set<User> users;

    @OneToMany
    @JoinColumn(name = "catId")
    @JsonIgnore
    private Set<Image> images;

    @Column(nullable = false)
    private LocalDate dateAdded;

    @PrePersist
    protected void onCreate() {
        dateAdded = LocalDate.now();
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); // Use a field that uniquely identifies the entity
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Cat cat = (Cat) obj;
        return Objects.equals(id, cat.id); // Compare only the unique identifier
    }
}

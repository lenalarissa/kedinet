package kedinet.kedinet.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import kedinet.kedinet.model.enums.Region;
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
@Table(name="shelters")
public class Shelter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Region region;

    @Column(nullable = false)
    private String address;

    @Column
    private String website;

    @Column
    private String email;

    @Column
    private String phone;

    @OneToOne(mappedBy = "shelter")
    @JsonBackReference("admin-shelter")
    private Admin admin;

    @OneToMany(mappedBy = "shelter")
    @JsonBackReference("shelter-cats")
    private Set<Cat> cats;
}

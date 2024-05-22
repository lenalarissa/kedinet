package kedinet.kedinet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
@Table(name="admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String secretKey;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shelterId", referencedColumnName = "id")
    @JsonManagedReference
    private Shelter shelter;

    @JsonIgnore
    public void setKey(String secretKey) {
        this.secretKey = secretKey;
    }
}


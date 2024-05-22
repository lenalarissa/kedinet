package kedinet.kedinet.dto;

import kedinet.kedinet.model.Shelter;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ShelterDTO {
    private Integer id;
    private String name;
    private String region;
    private String address;
    private String website;
    private String email;
    private String phone;

    public ShelterDTO(Shelter shelter) {
        this.id = shelter.getId();
        this.name = shelter.getName();
        this.region = shelter.getRegion().toString(); // Assuming Region is an enum
        this.address = shelter.getAddress();
        this.website = shelter.getWebsite();
        this.email = shelter.getEmail();
        this.phone = shelter.getPhone();
    }
}

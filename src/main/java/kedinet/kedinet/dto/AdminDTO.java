package kedinet.kedinet.dto;

import kedinet.kedinet.model.Admin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminDTO {
    private Integer id;
    private Integer loginId;
    private String secretKey;
    private String shelterName;
    private Integer shelterId;

    public AdminDTO(Admin admin) {
        this.id = admin.getId();
        this.loginId = admin.getLoginId();
        this.secretKey = admin.getSecretKey();
        this.shelterName = admin.getShelter().getName();
        this.shelterId = admin.getShelter().getId();
    }
}


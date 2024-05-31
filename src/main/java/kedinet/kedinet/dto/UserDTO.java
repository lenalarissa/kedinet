package kedinet.kedinet.dto;

import kedinet.kedinet.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private Integer id;
    private String email;
    private String secretKey;
    private Set<Integer> favCatIds;

    public UserDTO(User user) {
    }
}

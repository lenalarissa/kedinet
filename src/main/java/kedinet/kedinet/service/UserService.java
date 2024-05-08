package kedinet.kedinet.service;

import kedinet.kedinet.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public User saveUser(User user);
}

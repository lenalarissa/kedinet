package kedinet.kedinet.service;

import kedinet.kedinet.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User findByEmailAndPassword(String email, String password);
}

package kedinet.kedinet.service;

import kedinet.kedinet.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public User findByEmailAndPassword(String email, String password);
}

package kedinet.kedinet.service;

import kedinet.kedinet.model.User;
import kedinet.kedinet.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User findByEmailAndPassword(String email, String password) {
        return null;
    }


}

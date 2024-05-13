package kedinet.kedinet.controller;

import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.User;
import kedinet.kedinet.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        Optional<User> user = userRepo.findByEmail(newUser.getEmail());
        if(!user.isPresent()){
            userRepo.save(newUser);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity("User exists already", HttpStatus.CONFLICT);
    }

}

package kedinet.kedinet.controller;

import kedinet.kedinet.model.User;
import kedinet.kedinet.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;


    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User newUser) {
        Optional<User> user = userRepo.findByEmail(newUser.getEmail());
        if(!user.isPresent()){
            newUser.setSecretKey(UUID.randomUUID().toString());
            userRepo.save(newUser);
            return new ResponseEntity<String>(newUser.getSecretKey(), HttpStatus.CREATED);
        }
        return new ResponseEntity("User exists already", HttpStatus.CONFLICT);
    }
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email,
                                         @RequestParam String password){
        Optional<User> user = userRepo.findByEmailAndPassword(email, password);
        if(user.isPresent()){
          // TODO save a key?
            return new ResponseEntity<String>(user.get().getSecretKey(), HttpStatus.OK);
        }
        user = userRepo.findByEmail(email);
        if(user.isPresent()){
            return new ResponseEntity("Wrong Password", HttpStatus.CONFLICT);
        }
        return new ResponseEntity("User with this e-mail does not exist.", HttpStatus.CONFLICT);
    }

}

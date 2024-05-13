package kedinet.kedinet.controller;

import kedinet.kedinet.model.User;
import kedinet.kedinet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("createUser")
    public ResponseEntity<User>createUser(@RequestBody User user) {
        System.out.println("User wants to be created");
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/getAllUsers")
    List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}

package kedinet.kedinet.controller;

import kedinet.kedinet.model.User;
import kedinet.kedinet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "New user added";
    }

    @GetMapping("/getAllUsers")
    List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}

package kedinet.kedinet.controller;

import kedinet.kedinet.dto.CatDTO;
import kedinet.kedinet.dto.UserDTO;
import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.User;
import kedinet.kedinet.model.Image;
import kedinet.kedinet.repository.CatRepo;
import kedinet.kedinet.repository.ImageRepo;
import kedinet.kedinet.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CatRepo catRepo;

    @Autowired
    private ImageRepo imageRepo;


    @GetMapping("/details")
    public ResponseEntity<UserDTO> getUserDetails(@RequestParam String secretKey) {
        Optional<User> userOpt = userRepo.findBySecretKey(secretKey);
        if (!userOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userOpt.get();
        UserDTO userDTO = new UserDTO(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }


    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User newUser) {
        Optional<User> user = userRepo.findByEmail(newUser.getEmail());
        if (!user.isPresent()) {
            newUser.setSecretKey(UUID.randomUUID().toString());
            userRepo.save(newUser);
            return new ResponseEntity<>(newUser.getSecretKey(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User exists already", HttpStatus.CONFLICT);
    }

    @PostMapping("/loginUser") // Changed to POST
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> user = userRepo.findByEmailAndPassword(email, password);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get().getSecretKey(), HttpStatus.OK);
        }
        user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("User with this e-mail does not exist.", HttpStatus.CONFLICT);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> request) {
        String secretKey = request.get("secretKey");
        String newPassword = request.get("newPassword");
        Optional<User> userOptional = userRepo.findBySecretKey(secretKey);
        System.out.println(secretKey);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepo.save(user);
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/addFavorite")
    public ResponseEntity<String> addFavorite(@RequestParam String secretKey, @RequestParam Integer catId) {
        Optional<User> userOptional = userRepo.findBySecretKey(secretKey);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Cat> catOptional = catRepo.findById(catId);
            if (catOptional.isPresent()) {
                Cat cat = catOptional.get();
                Set<Cat> favorites = user.getFavCats();
                if (!favorites.contains(cat)) {
                    favorites.add(cat);
                    userRepo.save(user);
                    return new ResponseEntity<>("Cat added to favorites", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Cat is already in favorites", HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>("Cat not found", HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<CatDTO>> getFavoriteCats(@RequestParam String secretKey) {
        Optional<User> user = userRepo.findBySecretKey(secretKey);
        if (user.isPresent()) {
            List<CatDTO> favoriteCats = user.get().getFavCats().stream()
                    .map(cat -> new CatDTO(cat, imageRepo.findByCatId(cat.getId()).stream().map(Image::getName).collect(Collectors.toSet())))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(favoriteCats, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/removeFavorite")
    public ResponseEntity<String> removeFavorite(@RequestParam String secretKey, @RequestParam Integer catId) {
        Optional<User> userOptional = userRepo.findBySecretKey(secretKey);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Cat> catOptional = catRepo.findById(catId);
            if (catOptional.isPresent()) {
                Cat cat = catOptional.get();
                Set<Cat> favorites = user.getFavCats();
                if (favorites.contains(cat)) {
                    favorites.remove(cat);
                    userRepo.save(user);
                    return new ResponseEntity<>("Cat removed from favorites", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Cat is not in favorites", HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>("Cat not found", HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}

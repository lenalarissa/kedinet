package kedinet.kedinet.controller;

import kedinet.kedinet.model.Admin;
import kedinet.kedinet.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/createAdmin")
    public ResponseEntity<String> createAdmin(@RequestBody Admin newAdmin) {
        Optional<Admin> admin = adminRepo.findAdminByLoginId(newAdmin.getLoginId());
        if (!admin.isPresent()) {
            newAdmin.setSecretKey(UUID.randomUUID().toString());
            adminRepo.save(newAdmin);
            return new ResponseEntity<>(newAdmin.getSecretKey(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Admin exists already", HttpStatus.CONFLICT);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam int loginId,
                                        @RequestParam String password) {
        Optional<Admin> admin = adminRepo.findAdminByLoginIdAndPassword(loginId, password);
        if (admin.isPresent()) {
            return new ResponseEntity<>(admin.get().getSecretKey(), HttpStatus.OK);
        }
        admin = adminRepo.findAdminByLoginId(loginId);
        if (admin.isPresent()) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Admin with this ID does not exist.", HttpStatus.CONFLICT);
    }
}

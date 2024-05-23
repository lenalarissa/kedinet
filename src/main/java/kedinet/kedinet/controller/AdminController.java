package kedinet.kedinet.controller;

import kedinet.kedinet.dto.AdminDTO;
import kedinet.kedinet.dto.CatDTO;
import kedinet.kedinet.model.Admin;
import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.Image;
import kedinet.kedinet.repository.AdminRepo;
import kedinet.kedinet.repository.CatRepo;
import kedinet.kedinet.repository.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private CatRepo catRepo;

    @Autowired
    private ImageRepo imageRepo;

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


    @GetMapping("/details")
    public ResponseEntity<AdminDTO> getAdminDetails(@RequestParam String secretKey) {
        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Admin admin = adminOpt.get();
        AdminDTO adminDTO = new AdminDTO(admin);
        return new ResponseEntity<>(adminDTO, HttpStatus.OK);
    }

    @GetMapping("/cats")
    public ResponseEntity<List<CatDTO>> getCatsByAdmin(@RequestParam String secretKey) {
        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Admin admin = adminOpt.get();
        List<Cat> cats = catRepo.findByShelterId(admin.getShelter().getId());
        List<CatDTO> catDTOs = cats.stream()
                .map(cat -> new CatDTO(cat, imageRepo.findByCatId(cat.getId()).stream().map(Image::getName).collect(Collectors.toSet())))
                .collect(Collectors.toList());
        return new ResponseEntity<>(catDTOs, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCat")
    public ResponseEntity<Void> deleteCat(@RequestParam String secretKey, @RequestParam Integer id) {
        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Cat> catOpt = catRepo.findById(id);
        if (!catOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        catRepo.delete(catOpt.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

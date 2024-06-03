package kedinet.kedinet.controller;

import kedinet.kedinet.dto.AdminDTO;
import kedinet.kedinet.dto.CatDTO;
import kedinet.kedinet.model.Admin;
import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.Image;
import kedinet.kedinet.model.Shelter;
import kedinet.kedinet.model.enums.*;
import kedinet.kedinet.repository.AdminRepo;
import kedinet.kedinet.repository.CatRepo;
import kedinet.kedinet.repository.ImageRepo;
import kedinet.kedinet.repository.UserRepo;
import kedinet.kedinet.util.FileUploadUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private CatRepo catRepo;

    @Autowired
    private ImageRepo imageRepo;

    @Autowired
    private UserRepo userRepo;

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
    public ResponseEntity<String> login(@RequestParam int loginId, @RequestParam String password) {
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

        // Delete references in the fav_cats table
        Cat cat = catOpt.get();
        userRepo.deleteCatFromFavorites(cat.getId());

        // Delete the cat
        catRepo.delete(cat);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/updateCat/{id}")
    public ResponseEntity<Void> updateCat(@PathVariable Integer id, @RequestParam Map<String, String> catData, @RequestParam(required = false) MultipartFile[] images) {
        String secretKey = catData.get("secretKey");
        logger.info("Received secretKey: " + secretKey);

        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            logger.error("Admin not found for secretKey: " + secretKey);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Cat> catOpt = catRepo.findById(id);
        if (!catOpt.isPresent()) {
            logger.error("Cat not found for id: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Cat cat = catOpt.get();
        try {
            cat.setName(catData.get("name"));
            cat.setGender(Gender.valueOf(catData.get("gender").toUpperCase().replace(" ", "_")));
            cat.setBreed(Breed.valueOf(catData.get("breed").toUpperCase().replace(" ", "_")));
            cat.setAge(Integer.parseInt(catData.get("age")));
            cat.setIsIndoorCat(Boolean.parseBoolean(catData.get("indoorCat")));
            cat.setSize(Size.valueOf(catData.get("size").toUpperCase().replace(" ", "_")));
            cat.setCoatLength(CoatLength.valueOf(catData.get("coatLength").toUpperCase().replace(" ", "_")));
            cat.setCanLiveWith(CanLiveWith.valueOf(catData.get("canLiveWith").toUpperCase().replace(" ", "_")));
            cat.setDisease(catData.get("disease"));
            cat.setAbout(catData.get("about"));
            cat.setColor(Color.valueOf(catData.get("color").toUpperCase().replace(" ", "_")));
        } catch (Exception e) {
            logger.error("Error setting cat properties: " + e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (images != null) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    try {
                        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                        //Path uploadDir = Paths.get("/Users/lenaheisel/Git/kedinet/kedi_net/src/assets/cat_images").toAbsolutePath();
                        Path uploadDir = Paths.get("../kedinet/kedi_net/src/assets/cat_images").toAbsolutePath();
                        FileUploadUtil.saveFile(uploadDir.toString(), fileName, image);

                        Image img = new Image();
                        img.setName(fileName);
                        img.setCat(cat);
                        imageRepo.save(img);
                    } catch (IOException e) {
                        logger.error("Error saving image file: " + e.getMessage(), e);
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
            }
        }

        try {
            catRepo.save(cat);
        } catch (Exception e) {
            logger.error("Error saving cat: " + e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/deleteImageByName/{imageName}")
    public ResponseEntity<Void> deleteImageByName(@PathVariable String imageName, @RequestParam String secretKey) {
        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Image> images = imageRepo.findByName(imageName);
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for (Image image : images) {
            imageRepo.delete(image);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/addCat")
    public ResponseEntity<String> addCat(@RequestParam Map<String, String> catData, @RequestParam(required = false) MultipartFile[] images) {
        String secretKey = catData.get("secretKey");
        logger.info("Received secretKey: " + secretKey);

        Optional<Admin> adminOpt = adminRepo.findBySecretKey(secretKey);
        if (!adminOpt.isPresent()) {
            logger.error("Admin not found for secretKey: " + secretKey);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Admin admin = adminOpt.get();
        Shelter shelter = admin.getShelter();

        Cat cat = new Cat();
        try {
            cat.setName(catData.get("name"));
            cat.setBreed(Breed.valueOf(catData.get("breed").toUpperCase().replace(" ", "_")));
            cat.setGender(Gender.valueOf(catData.get("gender").toUpperCase()));
            cat.setAbout(catData.get("information"));
            cat.setAge(Integer.parseInt(catData.get("age")));
            cat.setIsIndoorCat(catData.get("indoorCat").equals("yes"));
            cat.setSize(Size.valueOf(catData.get("size").toUpperCase().replace(" ", "_")));
            cat.setCoatLength(CoatLength.valueOf(catData.get("coatLength").toUpperCase().replace(" ", "_")));
            cat.setColor(Color.valueOf(catData.get("color").toUpperCase().replace(" ", "_")));
            if (catData.containsKey("disease")) {
                cat.setDisease(catData.get("disease"));
            }
            cat.setShelter(shelter);

            // Handle CanLiveWith
            String canLiveWithValue = catData.get("canLiveWith").toUpperCase().replace(" ", "_");
            cat.setCanLiveWith(CanLiveWith.valueOf(canLiveWithValue));

            catRepo.save(cat);

            // Handle image upload
            if (images != null) {
                for (MultipartFile image : images) {
                    if (!image.isEmpty()) {
                        try {
                            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                            Path uploadDir = Paths.get("../kedinet/kedi_net/src/assets/cat_images").toAbsolutePath();
                            FileUploadUtil.saveFile(uploadDir.toString(), fileName, image);

                            Image img = new Image();
                            img.setName(fileName);
                            img.setCat(cat);
                            imageRepo.save(img);
                        } catch (IOException e) {
                            logger.error("Error saving image file: " + e.getMessage(), e);
                            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                    }
                }
            }

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error setting cat properties: " + e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

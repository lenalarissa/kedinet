package kedinet.kedinet.controller;

import kedinet.kedinet.model.Admin;
import kedinet.kedinet.model.Image;
import kedinet.kedinet.dto.CatDTO;
import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.enums.*;
import kedinet.kedinet.repository.AdminRepo;
import kedinet.kedinet.repository.CatRepo;
import kedinet.kedinet.repository.ImageRepo;
import kedinet.kedinet.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class CatController {

    @Autowired
    private CatService catService;

    @Autowired
    private CatRepo catRepo;

    @Autowired
    ImageRepo imageRepo;

    @Autowired
    AdminRepo adminRepo;

    @GetMapping("/readFavCats")
    public ResponseEntity<Iterable<Cat>> readAllCats(@RequestHeader("secretKey") String secretKey){
        System.out.println(secretKey);
        Iterable<Cat> cats = catRepo.findAll();
        return new ResponseEntity<Iterable<Cat>>(cats, HttpStatus.OK);
    }

    // TODO: TEST SORTING ADDITION
    @GetMapping("/readSearchedCats")
    public ResponseEntity<List<CatDTO>> readSearchedCats(
            @RequestParam(value = "minAge", required = false) Integer ageFrom,
            @RequestParam(value = "maxAge", required = false) Integer ageTo,
            @RequestParam(value = "selectedBreeds", required = false) List<Breed> breeds,
            @RequestParam(value = "selectedCanLiveWith", required = false) List<CanLiveWith> canLiveWithList,
            @RequestParam(value = "selectedCoatLength", required = false) List<CoatLength> coatLengths,
            @RequestParam(value = "selectedColors", required = false) List<Color> colors,
            @RequestParam(value = "selectedGender", required = false) List<Gender> genders,
            @RequestParam(value = "selectedIndoorCat", required = false) Boolean isIndoorCat,
            @RequestParam(value = "selectedRegions", required = false) List<Region> regions,
            @RequestParam(value = "selectedSize", required = false) List<Size> sizes,
            @RequestParam(value = "sort", required = false, defaultValue = "newest-oldest") String sortOption) {

        List<CatDTO> cats = catService.getFilteredCats(ageFrom, ageTo, breeds, canLiveWithList, coatLengths, colors, genders, isIndoorCat, regions, sizes);

        switch (sortOption) {
            case "newest-oldest":
                cats.sort(Comparator.comparing(CatDTO::getDateAdded).reversed());
                break;
            case "oldest-newest":
                cats.sort(Comparator.comparing(CatDTO::getDateAdded));
                break;
            case "young-old":
                cats.sort(Comparator.comparing(CatDTO::getAge));
                break;
            case "old-young":
                cats.sort(Comparator.comparing(CatDTO::getAge).reversed());
                break;
            default:
                break;
        }

        return new ResponseEntity<>(cats, HttpStatus.OK);
    }


    @GetMapping("/readCat")
    public ResponseEntity<CatDTO> readCat(@RequestParam(value = "id") int id) {
        Optional<Cat> cat = catRepo.findById(id);
        if(cat.isPresent()){
            Set<String> imageNames = cat.get().getImages().stream().map(Image::getName).collect(Collectors.toSet());
            CatDTO catDTO = new CatDTO(cat.get(), imageNames);
            return new ResponseEntity<>(catDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/cat/{id}")
    public ResponseEntity<CatDTO> getCatById(@PathVariable Integer id) {
        Optional<Cat> catOpt = catRepo.findById(id);
        if (!catOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Cat cat = catOpt.get();
        CatDTO catDTO = new CatDTO(cat, imageRepo.findByCatId(cat.getId()).stream().map(Image::getName).collect(Collectors.toSet()));
        return new ResponseEntity<>(catDTO, HttpStatus.OK);
    }

    // TODO: TEST ESP. IF DATE WAS ADDED
    @PostMapping("/createCat")
    public ResponseEntity<Cat> createCat(@RequestBody Cat cat) {
        catRepo.save(cat);
        return new ResponseEntity<Cat>(cat, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteCat")
    public ResponseEntity deleteCat(@RequestParam(value = "id") int id){
        Optional<Cat> cat = catRepo.findById(id);
        if(cat.isPresent()) {
            catRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.GONE);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateCat")
    public ResponseEntity<Cat> updateCat(@RequestBody Cat updatedCat){
        Optional<Cat> cat = catRepo.findById(updatedCat.getId());
        if(cat.isPresent()) {
            updatedCat = catRepo.save(updatedCat); // deletes the old cat
            return new ResponseEntity<Cat>(updatedCat, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/shelter/{shelterId}/cats")
    public ResponseEntity<List<CatDTO>> getCatsByShelter(@PathVariable Integer shelterId) {
        List<Cat> cats = catRepo.findByShelterId(shelterId);
        List<CatDTO> catDTOs = cats.stream()
                .map(cat -> new CatDTO(cat, imageRepo.findByCatId(cat.getId()).stream().map(Image::getName).collect(Collectors.toSet())))
                .collect(Collectors.toList());
        return new ResponseEntity<>(catDTOs, HttpStatus.OK);
    }
}

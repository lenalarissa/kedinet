package kedinet.kedinet.controller;


import kedinet.kedinet.model.Cat;
import kedinet.kedinet.repository.CatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CatController {

    @Autowired
    private CatRepo catRepo;

    @GetMapping("/readCats")
    public ResponseEntity<Iterable<Cat>> readCats(@RequestHeader("secretKey") String secretKey){
        Iterable<Cat> cats = catRepo.findAll();
        return new ResponseEntity<Iterable<Cat>>(cats, HttpStatus.OK);
    }

    @GetMapping("/readCat")
    public ResponseEntity<Cat> readCat(@RequestParam(value = "id") int id) {
        Optional<Cat> cat = catRepo.findById(id);
        if(cat.isPresent()){
            return new ResponseEntity<Cat>(cat.get(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

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
}

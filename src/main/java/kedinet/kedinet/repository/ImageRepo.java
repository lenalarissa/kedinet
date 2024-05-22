package kedinet.kedinet.repository;

import kedinet.kedinet.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ImageRepo extends JpaRepository<Image, Integer> {
    Optional<Image> findByName(String name);
    Set<Image> findByCatId(Integer catId);
}

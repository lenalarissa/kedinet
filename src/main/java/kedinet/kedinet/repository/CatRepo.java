package kedinet.kedinet.repository;

import kedinet.kedinet.model.Cat;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface CatRepo extends JpaRepository<Cat, Integer>, CatRepoCustom {
    List<Cat> findByShelterId(Integer shelterId);
}


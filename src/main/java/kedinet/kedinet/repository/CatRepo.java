package kedinet.kedinet.repository;

import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.enums.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// TODO: TEST
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CatRepo extends JpaRepository<Cat, Integer>, CatRepoCustom {
    List<Cat> findByShelterId(Integer shelterId);
}


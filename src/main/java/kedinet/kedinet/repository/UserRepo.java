package kedinet.kedinet.repository;

import jakarta.transaction.Transactional;
import kedinet.kedinet.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findBySecretKey(String secretKey);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM fav_cats WHERE cat_id = :catId", nativeQuery = true)
    void deleteCatFromFavorites(Integer catId);
}

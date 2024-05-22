package kedinet.kedinet.repository;

import kedinet.kedinet.model.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdminRepo extends CrudRepository<Admin, Integer> {
    Optional<Admin> findAdminByLoginId(Integer loginId);
    Optional<Admin> findAdminByLoginIdAndPassword(Integer loginId, String password);
}

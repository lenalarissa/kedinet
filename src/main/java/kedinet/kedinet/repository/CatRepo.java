package kedinet.kedinet.repository;

import kedinet.kedinet.model.Cat;
import org.springframework.data.repository.CrudRepository;

public interface CatRepo extends CrudRepository<Cat, Integer> {
}

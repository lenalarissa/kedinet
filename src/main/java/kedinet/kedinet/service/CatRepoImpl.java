package kedinet.kedinet.service;

import kedinet.kedinet.model.Cat;
import kedinet.kedinet.model.enums.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import kedinet.kedinet.repository.CatRepoCustom;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// TODO: TEST
@Component
public class CatRepoImpl implements CatRepoCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Cat> findFilteredCats(Integer ageFrom, Integer ageTo, List<Breed> breeds, List<CanLiveWith> canLiveWithList, List<CoatLength> coatLengths, List<Color> colors, List<Gender> genders, Boolean isIndoorCat, List<Region> regions, List<Size> sizes) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Cat> query = cb.createQuery(Cat.class);
        Root<Cat> cat = query.from(Cat.class);
        List<Predicate> predicates = new ArrayList<>();

        if (ageFrom != null) {
            predicates.add(cb.greaterThanOrEqualTo(cat.get("age"), ageFrom));
        }
        if (ageTo != null) {
            predicates.add(cb.lessThanOrEqualTo(cat.get("age"), ageTo));
        }
        if (breeds != null && !breeds.isEmpty()) {
            predicates.add(cat.get("breed").in(breeds));
        }
        if (canLiveWithList != null && !canLiveWithList.isEmpty()) {
            predicates.add(cat.get("canLiveWith").in(canLiveWithList));
        }
        if (coatLengths != null && !coatLengths.isEmpty()) {
            predicates.add(cat.get("coatLength").in(coatLengths));
        }
        if (colors != null && !colors.isEmpty()) {
            predicates.add(cat.get("color").in(colors));
        }
        if (genders != null && !genders.isEmpty()) {
            predicates.add(cat.get("gender").in(genders));
        }
        if (isIndoorCat != null) {
            predicates.add(cb.equal(cat.get("isIndoorCat"), isIndoorCat));
        }
        if (regions != null && !regions.isEmpty()) {
            predicates.add(cat.get("shelter").get("region").in(regions));
        }
        if (sizes != null && !sizes.isEmpty()) {
            predicates.add(cat.get("size").in(sizes));
        }

        query.select(cat).where(predicates.toArray(new Predicate[0]));

        // Log the constructed query and predicates
        System.out.println("Executing query with predicates: " + predicates);

        return entityManager.createQuery(query).getResultList();
    }
}

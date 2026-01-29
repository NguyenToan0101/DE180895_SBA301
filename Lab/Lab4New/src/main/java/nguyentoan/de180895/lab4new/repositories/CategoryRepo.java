package nguyentoan.de180895.lab4new.repositories;

import nguyentoan.de180895.lab4new.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {

}

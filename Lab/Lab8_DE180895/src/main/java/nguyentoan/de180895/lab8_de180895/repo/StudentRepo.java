package nguyentoan.de180895.lab8_de180895.repo;

import nguyentoan.de180895.lab8_de180895.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface StudentRepo extends MongoRepository<Student, Integer> {

   Optional<Student> findByEmail(String email);
}

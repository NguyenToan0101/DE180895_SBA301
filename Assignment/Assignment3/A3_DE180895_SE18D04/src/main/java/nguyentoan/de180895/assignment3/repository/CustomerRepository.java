package nguyentoan.de180895.assignment3.repository;

import nguyentoan.de180895.assignment3.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmailAddress(String emailAddress);
    boolean existsByEmailAddress(String emailAddress);
}

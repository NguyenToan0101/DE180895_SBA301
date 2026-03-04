package nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository;

import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepo extends JpaRepository<Car, Long> {
}

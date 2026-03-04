package nguyentoan.de180895.assignment3.repository;

import nguyentoan.de180895.assignment3.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingReservationRepository extends JpaRepository<BookingReservation, Long> {
    List<BookingReservation> findByCustomer_CustomerID(Long customerId);
    List<BookingReservation> findByCustomer_EmailAddress(String email);
}

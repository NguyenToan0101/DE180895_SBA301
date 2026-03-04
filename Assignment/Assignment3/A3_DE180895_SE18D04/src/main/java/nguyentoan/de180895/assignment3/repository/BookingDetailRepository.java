package nguyentoan.de180895.assignment3.repository;

import nguyentoan.de180895.assignment3.entity.BookingDetail;
import nguyentoan.de180895.assignment3.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {
    List<BookingDetail> findById_BookingReservationID(Long bookingReservationID);

    boolean existsByRoom_RoomID(Long roomId);
}

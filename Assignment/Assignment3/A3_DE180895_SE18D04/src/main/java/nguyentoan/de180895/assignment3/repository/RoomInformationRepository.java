package nguyentoan.de180895.assignment3.repository;

import nguyentoan.de180895.assignment3.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomInformationRepository extends JpaRepository<RoomInformation, Long> {
    List<RoomInformation> findByRoomStatus(String roomStatus);

    // Kiểm tra phòng có trong booking detail chưa
    @Query("SELECT COUNT(bd) > 0 FROM BookingDetail bd WHERE bd.room.roomID = :roomId")
    boolean existsInBookingDetail(@Param("roomId") Long roomId);
}

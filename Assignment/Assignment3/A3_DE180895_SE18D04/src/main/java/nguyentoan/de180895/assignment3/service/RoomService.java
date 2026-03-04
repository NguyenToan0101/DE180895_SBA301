package nguyentoan.de180895.assignment3.service;

import nguyentoan.de180895.assignment3.entity.RoomInformation;
import nguyentoan.de180895.assignment3.entity.RoomType;
import nguyentoan.de180895.assignment3.repository.BookingDetailRepository;
import nguyentoan.de180895.assignment3.repository.RoomInformationRepository;
import nguyentoan.de180895.assignment3.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomInformationRepository roomRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomInformation> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<RoomInformation> getAvailableRooms() {
        return roomRepository.findByRoomStatus("AVAILABLE");
    }

    public RoomInformation getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found: " + id));
    }

    public RoomInformation createRoom(RoomInformation room) {


        RoomType roomType = roomTypeRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("RoomType not found"));
        room.setRoomType(roomType);
        room.setRoomStatus("AVAILABLE");
        return roomRepository.save(room);
    }

    public RoomInformation updateRoom(Long id, RoomInformation updatedRoom) {

        RoomInformation room = getRoomById(id);

        room.setRoomNumber(updatedRoom.getRoomNumber());
        room.setRoomDetailDescription(updatedRoom.getRoomDetailDescription());
        room.setRoomMaxCapacity(updatedRoom.getRoomMaxCapacity());
        room.setRoomPricePerDay(updatedRoom.getRoomPricePerDay());

        // 🔥 FIX CHÍNH Ở ĐÂY
        Long roomTypeId = updatedRoom.getRoomType().getRoomTypeID();

        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new RuntimeException("RoomType not found"));

        room.setRoomType(roomType);

        return roomRepository.save(room);
    }

    public String deleteRoom(Long id) {
        RoomInformation room = getRoomById(id);

        // ✅ Logic quan trọng: kiểm tra booking detail
        boolean hasBookings = bookingDetailRepository.existsByRoom_RoomID(id);

        if (hasBookings) {
            // Đã có booking → chỉ đổi status, KHÔNG xóa
            room.setRoomStatus("UNAVAILABLE");
            roomRepository.save(room);
            return "Room status changed to UNAVAILABLE (has existing bookings)";
        } else {
            // Chưa có booking → xóa hẳn
            roomRepository.delete(room);
            return "Room deleted successfully";
        }
    }
}

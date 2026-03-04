package nguyentoan.de180895.assignment3.controller;

import nguyentoan.de180895.assignment3.entity.RoomInformation;
import nguyentoan.de180895.assignment3.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // ✅ PUBLIC - không cần auth
    @GetMapping
    public ResponseEntity<List<RoomInformation>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomInformation>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomInformation> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    // ✅ STAFF ONLY
    @PostMapping
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<RoomInformation> createRoom(@RequestBody RoomInformation room) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.createRoom(room));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<RoomInformation> updateRoom(
            @PathVariable Long id, @RequestBody RoomInformation room) {
        return ResponseEntity.ok(roomService.updateRoom(id, room));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        String message = roomService.deleteRoom(id);
        return ResponseEntity.ok(Map.of("message", message));
    }
}

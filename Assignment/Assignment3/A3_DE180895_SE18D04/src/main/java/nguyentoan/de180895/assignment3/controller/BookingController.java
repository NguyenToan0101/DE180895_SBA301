package nguyentoan.de180895.assignment3.controller;

import nguyentoan.de180895.assignment3.dto.request.BookingRequest;
import nguyentoan.de180895.assignment3.entity.BookingReservation;
import nguyentoan.de180895.assignment3.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Customer tạo booking
    @PostMapping
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<BookingReservation> createBooking(
            @RequestBody BookingRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(email, request));
    }

    // Customer xem lịch sử của mình
    @GetMapping("/my-bookings")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<BookingReservation>> getMyBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getBookingsByEmail(authentication.getName()));
    }

    // Staff xem tất cả
    @GetMapping
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<List<BookingReservation>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<BookingReservation> updateBooking(
            @PathVariable Long id,
            @RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.updateBooking(id, request));
    }
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<BookingReservation> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("bookingStatus");
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }
}

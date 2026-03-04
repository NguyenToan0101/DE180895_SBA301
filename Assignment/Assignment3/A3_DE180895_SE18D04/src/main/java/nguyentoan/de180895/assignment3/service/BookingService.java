package nguyentoan.de180895.assignment3.service;

import jakarta.transaction.Transactional;
import nguyentoan.de180895.assignment3.dto.request.BookingDetailRequest;
import nguyentoan.de180895.assignment3.dto.request.BookingRequest;
import nguyentoan.de180895.assignment3.entity.*;
import nguyentoan.de180895.assignment3.repository.BookingReservationRepository;
import nguyentoan.de180895.assignment3.repository.CustomerRepository;
import nguyentoan.de180895.assignment3.repository.RoomInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingReservationRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomInformationRepository roomRepository;

    @Transactional
    public BookingReservation createBooking(String email, BookingRequest request) {
        Customer customer = customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        BookingReservation booking = new BookingReservation();
        booking.setCustomer(customer);
        booking.setBookingDate(LocalDate.now());
        booking.setBookingStatus("PENDING");

        // Tạo booking trước để có ID
        BookingReservation savedBooking = bookingRepository.save(booking);

        List<BookingDetail> details = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (BookingDetailRequest detailReq : request.getDetails()) {
            RoomInformation room = roomRepository.findById(detailReq.getRoomID())
                    .orElseThrow(() -> new RuntimeException("Room not found: " + detailReq.getRoomID()));

            if (!"AVAILABLE".equals(room.getRoomStatus())) {
                throw new RuntimeException("Room " + room.getRoomNumber() + " is not available");
            }

            // Tính số ngày và giá
            long days = ChronoUnit.DAYS.between(detailReq.getStartDate(), detailReq.getEndDate());
            BigDecimal price = room.getRoomPricePerDay().multiply(BigDecimal.valueOf(days));

            // ✅ Tạo composite key
            BookingDetailId detailId = new BookingDetailId(
                    savedBooking.getBookingReservationID(),
                    room.getRoomID()
            );

            BookingDetail detail = new BookingDetail();
            detail.setId(detailId);
            detail.setBookingReservation(savedBooking);
            detail.setRoom(room);
            detail.setStartDate(detailReq.getStartDate());
            detail.setEndDate(detailReq.getEndDate());
            detail.setActualPrice(price);

            details.add(detail);
            total = total.add(price);
        }

        savedBooking.setBookingDetails(details);
        savedBooking.setTotalPrice(total);

        return bookingRepository.save(savedBooking);
    }

    public List<BookingReservation> getBookingsByEmail(String email) {
        return bookingRepository.findByCustomer_EmailAddress(email);
    }

    public List<BookingReservation> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public BookingReservation updateBooking(Long id, BookingRequest request) {
        BookingReservation booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Xóa details cũ, thêm mới
        booking.getBookingDetails().clear();

        List<BookingDetail> newDetails = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (BookingDetailRequest detailReq : request.getDetails()) {
            RoomInformation room = roomRepository.findById(detailReq.getRoomID())
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            long days = ChronoUnit.DAYS.between(detailReq.getStartDate(), detailReq.getEndDate());
            BigDecimal price = room.getRoomPricePerDay().multiply(BigDecimal.valueOf(days));

            BookingDetailId detailId = new BookingDetailId(
                    booking.getBookingReservationID(),
                    room.getRoomID()
            );

            BookingDetail detail = new BookingDetail();
            detail.setId(detailId);
            detail.setBookingReservation(booking);
            detail.setRoom(room);
            detail.setStartDate(detailReq.getStartDate());
            detail.setEndDate(detailReq.getEndDate());
            detail.setActualPrice(price);

            newDetails.add(detail);
            total = total.add(price);
        }

        booking.setBookingDetails(newDetails);
        booking.setTotalPrice(total);
        return bookingRepository.save(booking);
    }
    public BookingReservation updateBookingStatus(Long id, String status) {
        BookingReservation booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingStatus(status);
        return bookingRepository.save(booking);
    }
}

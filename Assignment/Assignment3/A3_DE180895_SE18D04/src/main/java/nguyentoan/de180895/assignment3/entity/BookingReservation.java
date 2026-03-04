package nguyentoan.de180895.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "BookingReservation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingReservationID;

    private LocalDate bookingDate;

    private BigDecimal totalPrice;

    private String bookingStatus;

    @ManyToOne
    @JoinColumn(name = "customerID")
    private Customer customer;

    @OneToMany(mappedBy = "bookingReservation", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BookingDetail> bookingDetails;
}

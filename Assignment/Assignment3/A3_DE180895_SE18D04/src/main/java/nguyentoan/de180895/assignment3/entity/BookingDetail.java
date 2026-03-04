package nguyentoan.de180895.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "BookingDetail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDetail {

    @EmbeddedId
    private BookingDetailId id;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal actualPrice;

    @ManyToOne
    @MapsId("bookingReservationID")
    @JoinColumn(name = "bookingReservationID")
    @JsonIgnore
    private BookingReservation bookingReservation;

    @ManyToOne
    @MapsId("roomID")
    @JoinColumn(name = "roomID")
    @JsonIgnore
    private RoomInformation room;
}

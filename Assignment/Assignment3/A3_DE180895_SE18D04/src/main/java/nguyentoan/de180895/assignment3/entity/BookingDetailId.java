package nguyentoan.de180895.assignment3.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailId implements Serializable {

    private Long bookingReservationID;
    private Long roomID;
}

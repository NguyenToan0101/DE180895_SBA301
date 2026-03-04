package nguyentoan.de180895.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "RoomInformation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomID;

    private String roomNumber;

    private String roomDetailDescription;

    private Integer roomMaxCapacity;

    private String roomStatus;

    private BigDecimal roomPricePerDay;

    @ManyToOne
    @JoinColumn(name = "roomTypeID")
    private RoomType roomType;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<BookingDetail> bookingDetails;
}
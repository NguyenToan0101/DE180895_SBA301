package nguyentoan.de180895.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "RoomType")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomTypeID;

    private String roomTypeName;

    private String typeDescription;

    private String typeNote;

    @OneToMany(mappedBy = "roomType")
    @JsonIgnore
    private List<RoomInformation> rooms;
}

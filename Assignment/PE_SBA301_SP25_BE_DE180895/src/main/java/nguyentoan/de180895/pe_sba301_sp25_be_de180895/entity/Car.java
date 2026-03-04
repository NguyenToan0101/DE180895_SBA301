package nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carID;

    @Column(nullable = false)
    private String carName;

    @Column(nullable = false)
    private Integer unitsInStock;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // ====== Relationship ======
    @ManyToOne
    @JoinColumn(name = "CountryID", nullable = false)
    private Country country;

    // ====== Auto Timestamp ======
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
package nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarResponse {

    private Long carID;
    private String carName;
    private Integer unitsInStock;
    private BigDecimal unitPrice;
    private String countryName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
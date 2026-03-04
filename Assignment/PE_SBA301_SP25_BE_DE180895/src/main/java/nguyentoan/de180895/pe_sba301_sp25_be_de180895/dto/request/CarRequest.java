package nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CarRequest {
    private String carName;
    private Integer unitsInStock;
    private BigDecimal unitPrice;
    private Long countryID;
}

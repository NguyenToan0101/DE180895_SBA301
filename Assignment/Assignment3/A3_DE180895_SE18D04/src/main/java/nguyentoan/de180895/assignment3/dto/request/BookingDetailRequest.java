package nguyentoan.de180895.assignment3.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingDetailRequest {
    private Long roomID;
    private LocalDate startDate;
    private LocalDate endDate;
}

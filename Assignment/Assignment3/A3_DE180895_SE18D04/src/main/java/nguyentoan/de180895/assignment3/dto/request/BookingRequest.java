package nguyentoan.de180895.assignment3.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {
    private List<BookingDetailRequest> details;
}

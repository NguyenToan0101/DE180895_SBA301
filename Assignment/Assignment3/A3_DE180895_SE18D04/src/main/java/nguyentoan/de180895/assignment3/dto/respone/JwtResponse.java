package nguyentoan.de180895.assignment3.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long customerID;
    private String email;
    private List<String> roles;
}

package nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String type;
    private Long userId;
    private String email;
    private List<String> roles;
}

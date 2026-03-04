package nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String role;
}

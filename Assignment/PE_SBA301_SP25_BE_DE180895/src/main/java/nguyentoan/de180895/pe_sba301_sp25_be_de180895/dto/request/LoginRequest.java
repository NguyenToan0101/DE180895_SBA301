package nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
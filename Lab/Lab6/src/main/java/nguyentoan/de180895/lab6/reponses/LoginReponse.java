package nguyentoan.de180895.lab6.reponses;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@lombok.Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginReponse {
    private String token;
    private long expiresIn;
}

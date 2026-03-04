package nguyentoan.de180895.lab6.controlller;

import nguyentoan.de180895.lab6.dtos.LoginUserDTO;
import nguyentoan.de180895.lab6.dtos.RegisterUserDTO;
import nguyentoan.de180895.lab6.entities.User;
import nguyentoan.de180895.lab6.reponses.LoginReponse;
import nguyentoan.de180895.lab6.services.AuthenticationService;
import nguyentoan.de180895.lab6.services.JWTService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JWTService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JWTService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO userDTO){
        return ResponseEntity.ok(authenticationService.signup(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginReponse> authenticate(@RequestBody LoginUserDTO loginUserDTO){
        User authenticateUser = authenticationService.authenticate(loginUserDTO);
        String jwtToken = jwtService.generateToken(authenticateUser);
        LoginReponse loginReponse = new LoginReponse();
        loginReponse.setToken(jwtToken);
        loginReponse.setExpiresIn(jwtService.getEXPIRATION_TIME());
        return ResponseEntity.ok(loginReponse);
    }
}

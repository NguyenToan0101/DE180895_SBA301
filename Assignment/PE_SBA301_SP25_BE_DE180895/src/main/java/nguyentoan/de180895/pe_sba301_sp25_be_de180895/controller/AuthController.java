package nguyentoan.de180895.pe_sba301_sp25_be_de180895.controller;


import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.LoginRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.RegisterRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response.JwtResponse;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.AccountMember;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.AccountMemberRepository;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.security.JwtTokenProvider;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;
    private final AccountMemberRepository accountMemberRepository;

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        AccountMember account = accountMemberRepository
                .findByEmailAddress(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new JwtResponse(
                        token,
                        "Bearer",
                        account.getMemberID(),
                        account.getEmailAddress(),
                        roles
                )
        );
    }

    // ===== REGISTER =====
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        AccountMember account = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "message", "Registered successfully",
                        "memberID", account.getMemberID()
                ));
    }

    // ===== LOGOUT =====
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
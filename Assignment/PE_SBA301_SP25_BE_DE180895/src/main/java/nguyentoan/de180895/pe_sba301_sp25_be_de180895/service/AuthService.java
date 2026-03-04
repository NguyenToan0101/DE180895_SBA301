package nguyentoan.de180895.pe_sba301_sp25_be_de180895.service;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.LoginRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.RegisterRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response.AuthResponse;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.AccountMember;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.AccountMemberRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountMemberRepository accountMemberRepository;
    private final PasswordEncoder passwordEncoder;

    // ===== REGISTER =====
    public AccountMember register(RegisterRequest request) {

        if (accountMemberRepository.existsByEmailAddress(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        AccountMember account = AccountMember.builder()
                .emailAddress(request.getEmail())
                .memberPassword(passwordEncoder.encode(request.getPassword()))
                .memberRole(3) // mặc định CUSTOMER
                .build();

        return accountMemberRepository.save(account);
    }

    // ===== Map Role =====
    public String mapRole(Integer role) {
        return switch (role) {
            case 1 -> "ADMIN";
            case 2 -> "STAFF";
            case 3 -> "CUSTOMER";
            default -> "CUSTOMER";
        };
    }
}

package nguyentoan.de180895.pe_sba301_sp25_be_de180895.service;

import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.AccountMember;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.AccountMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountMemberRepository accountMemberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("Loading user: " + email);

        AccountMember member = accountMemberRepository.findByEmailAddress(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email));

        // Convert memberRole (1,2,3) → ROLE_XXX
        String roleName = mapRole(member.getMemberRole());

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(roleName)
        );

        return new org.springframework.security.core.userdetails.User(
                member.getEmailAddress(),
                member.getMemberPassword(),
                authorities
        );
    }

    private String mapRole(Integer role) {
        return switch (role) {
            case 1 -> "ADMIN";
            case 2 -> "STAFF";
            case 3 -> "MEMBER";
            default -> throw new RuntimeException("Invalid role value");
        };
    }
}

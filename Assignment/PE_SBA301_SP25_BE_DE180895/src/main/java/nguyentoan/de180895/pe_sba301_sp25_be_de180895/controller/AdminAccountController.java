package nguyentoan.de180895.pe_sba301_sp25_be_de180895.controller;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.AccountMember;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.AccountMemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/account")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminAccountController {

    private final AccountMemberRepository repository;

    @GetMapping
    public List<AccountMember> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok("User deleted");
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateRole(@PathVariable Long id,
                                        @RequestParam Integer role) {

        AccountMember account = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        account.setMemberRole(role);
        repository.save(account);

        return ResponseEntity.ok("Role updated");
    }
}

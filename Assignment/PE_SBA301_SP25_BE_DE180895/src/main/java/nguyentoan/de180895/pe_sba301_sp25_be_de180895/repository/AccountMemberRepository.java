package nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository;

import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.AccountMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  AccountMemberRepository  extends JpaRepository<AccountMember, Long> {
    Optional<AccountMember> findByEmailAddress(String emailAddress);
    boolean existsByEmailAddress(String emailAddress);


}

package nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AccountMember")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberID;

    @Column(nullable = false)
    private String memberPassword;

    @Column(nullable = false, unique = true)
    private String emailAddress;

    /**
     * 1 = Admin
     * 2 = Staff
     * 3 = Member
     */
    @Column(nullable = false)
    private Integer memberRole;
}
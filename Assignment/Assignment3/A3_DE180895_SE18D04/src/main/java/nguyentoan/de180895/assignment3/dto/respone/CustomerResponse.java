package nguyentoan.de180895.assignment3.dto.respone;

import java.time.LocalDate;
import java.util.Set;
@lombok.Data
public class CustomerResponse {

    private Long customerID;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String customerStatus;
    private LocalDate customerBirthday;
    private Set<String> roles;

}

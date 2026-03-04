package nguyentoan.de180895.assignment3.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDate customerBirthday;
}
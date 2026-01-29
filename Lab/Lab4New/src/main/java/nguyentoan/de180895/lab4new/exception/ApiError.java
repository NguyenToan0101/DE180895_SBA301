package nguyentoan.de180895.lab4new.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    // constructor + getter/setter
}


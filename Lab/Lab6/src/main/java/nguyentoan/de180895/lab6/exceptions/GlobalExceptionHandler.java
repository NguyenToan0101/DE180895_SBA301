package nguyentoan.de180895.lab6.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler()
    public ProblemDetail handleSecurityException(Exception e){
        ProblemDetail errorDetail = null;
        e.printStackTrace();
        if(e instanceof BadCredentialsException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), "Invalid username or password");
            return errorDetail;
        }
        if(e instanceof AccountStatusException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), "User is disabled");
            return errorDetail;
        }
        if(e instanceof AccessDeniedException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), "Access denied");
            return errorDetail;
        }
        if(e instanceof SignatureException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), "Invalid token");
            return errorDetail;
        }
        if(e instanceof ExpiredJwtException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), "Token expired");

            return errorDetail;
        }
        return errorDetail;
    }
}

package nguyentoan.de180895.lab6.services;

import io.jsonwebtoken.Claims;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Data
public class JWTService {
    @Value("${jwt.secret}")
    private String secretKey ;
    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME  ;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildToken(claims,userDetails,EXPIRATION_TIME);
    }
    private String buildToken(Map<String, Object> claims, UserDetails userDetails, long expirationTime) {
        return io.jsonwebtoken.Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                .setExpiration(new java.util.Date(System.currentTimeMillis() + expirationTime * 1000))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secretKey).compact();
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return io.jsonwebtoken.Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}

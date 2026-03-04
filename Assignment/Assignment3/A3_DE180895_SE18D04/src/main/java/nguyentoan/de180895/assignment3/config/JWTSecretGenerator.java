//package nguyentoan.de180895.assignment3.config;
//
//import io.jsonwebtoken.security.Keys;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//import javax.crypto.SecretKey;
//import java.util.Base64;
//
//public class JWTSecretGenerator {
//
//    public static void main(String[] args) {
//        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
//        System.out.println(base64Key);
//    }
//}

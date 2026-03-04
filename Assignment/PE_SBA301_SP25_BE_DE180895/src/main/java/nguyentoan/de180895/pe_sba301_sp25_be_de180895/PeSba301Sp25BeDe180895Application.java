package nguyentoan.de180895.pe_sba301_sp25_be_de180895;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PeSba301Sp25BeDe180895Application {

    public static void main(String[] args) {
        SpringApplication.run(PeSba301Sp25BeDe180895Application.class, args);
    }
    @Bean
    CommandLineRunner run(PasswordEncoder encoder) {
        return args -> {
            String rawPassword = "@3";
            String encoded = encoder.encode(rawPassword);
            System.out.println("Encoded password: " + encoded);
        };
    }
}

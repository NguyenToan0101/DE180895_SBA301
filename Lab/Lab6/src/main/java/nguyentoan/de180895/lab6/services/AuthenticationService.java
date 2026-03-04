package nguyentoan.de180895.lab6.services;

import nguyentoan.de180895.lab6.dtos.LoginUserDTO;
import nguyentoan.de180895.lab6.dtos.RegisterUserDTO;
import nguyentoan.de180895.lab6.entities.User;
import nguyentoan.de180895.lab6.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
    public User signup(RegisterUserDTO userDTO){
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(user);
    }
    public User authenticate(LoginUserDTO loginUserDTO){
        authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(), loginUserDTO.getPassword())
        );
        return userRepository.findByEmail(loginUserDTO.getEmail()).orElseThrow();
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }



}

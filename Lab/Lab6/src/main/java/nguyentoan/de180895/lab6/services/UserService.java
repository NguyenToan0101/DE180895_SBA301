package nguyentoan.de180895.lab6.services;

import nguyentoan.de180895.lab6.entities.User;
import nguyentoan.de180895.lab6.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}

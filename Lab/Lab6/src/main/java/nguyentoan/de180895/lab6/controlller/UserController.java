package nguyentoan.de180895.lab6.controlller;

import nguyentoan.de180895.lab6.entities.User;
import nguyentoan.de180895.lab6.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/me")
    public ResponseEntity<User> authenticateUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.getAllUsers().stream().filter(user -> {
            assert authentication != null;
            return user.getEmail().equals(authentication.getName());
        }).findFirst().orElse(null);
        return ResponseEntity.ok(currentUser);
    }
    @GetMapping
    public ResponseEntity<List<User>> allUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}

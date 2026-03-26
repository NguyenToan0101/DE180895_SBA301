package nguyentoan.de180895.lab8_de180895.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.lab8_de180895.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final StudentService studentService;

    // Show login page
    @GetMapping({"/", "/login"})
    public String loginPage(HttpSession session) {
        if (session.getAttribute("loggedIn") != null) {
            return "redirect:/students";
        }
        return "login";
    }

    // Handle login form submit
    @PostMapping("/login")
    public String handleLogin(@RequestParam String email,
                              @RequestParam String password,
                              HttpSession session,
                              Model model) {
        if (studentService.authenticate(email, password)) {
            session.setAttribute("loggedIn", true);
            session.setAttribute("userEmail", email);
            return "redirect:/students";
        }

        System.out.println("email:" + email + "password" + password);
        model.addAttribute("error", "Invalid email or password. Please try again.");
        return "login";
    }

    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
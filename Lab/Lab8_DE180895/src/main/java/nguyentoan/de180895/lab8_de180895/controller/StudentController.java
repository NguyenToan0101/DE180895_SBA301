package nguyentoan.de180895.lab8_de180895.controller;




import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.lab8_de180895.entity.Student;
import nguyentoan.de180895.lab8_de180895.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    // ── Auth guard helper ──
    private boolean isNotLoggedIn(HttpSession session) {
        return session.getAttribute("loggedIn") == null;
    }

    // ─────────────────────────────────────────
    // LIST all students
    // ─────────────────────────────────────────
    @GetMapping
    public String listStudents(Model model, HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        model.addAttribute("students", studentService.findAll());
        return "student-list";
    }

    // ─────────────────────────────────────────
    // SHOW detail of one student
    // ─────────────────────────────────────────
    @GetMapping("/{id}")
    public String viewStudent(@PathVariable int id, Model model, HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        return studentService.getStudentById(id)
                .map(s -> {
                    model.addAttribute("student", s);
                    return "student-detail";
                })
                .orElse("redirect:/students");
    }

    // ─────────────────────────────────────────
    // SHOW create form
    // ─────────────────────────────────────────
    @GetMapping("/new")
    public String newStudentForm(Model model, HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        model.addAttribute("student", new Student());
        return "student-form";
    }

    // ─────────────────────────────────────────
    // CREATE student
    // ─────────────────────────────────────────
    @PostMapping
    public String createStudent(@ModelAttribute Student student,
                                RedirectAttributes ra,
                                HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        try {
            // Filter out empty books
            if (student.getBooks() != null) {
                student.setBooks(
                        student.getBooks().stream()
                                .filter(b -> b != null && b.getTitle() != null && !b.getTitle().isBlank())
                                .toList()
                );
            }
            System.out.println("Student:" + student);
            studentService.save(student);
            ra.addFlashAttribute("successMessage", "Student \"" + student.getFirstName() + " " + student.getLastName() + "\" created successfully!");
        } catch (Exception e) {
            ra.addFlashAttribute("errorMessage", "Failed to create student: " + e.getMessage());
        }
        return "redirect:/students";
    }

    // ─────────────────────────────────────────
    // SHOW edit form
    // ─────────────────────────────────────────
    @GetMapping("/{id}/edit")
    public String editStudentForm(@PathVariable int id, Model model, HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        return studentService.getStudentById(id)
                .map(s -> {
                    model.addAttribute("student", s);
                    return "student-form";
                })
                .orElse("redirect:/students");
    }

    // ─────────────────────────────────────────
    // UPDATE student
    // ─────────────────────────────────────────
    @PostMapping("/{id}/update")
    public String updateStudent(@PathVariable int id,
                                @ModelAttribute Student student,
                                RedirectAttributes ra,
                                HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        try {
            student.setId(id);
            // Keep existing password if not provided
            if (student.getPassword() == null || student.getPassword().isBlank()) {
                studentService.getStudentById(id)
                        .ifPresent(existing -> student.setPassword(existing.getPassword()));
            }
            // Filter empty books
            if (student.getBooks() != null) {
                student.setBooks(
                        student.getBooks().stream()
                                .filter(b -> b != null && b.getTitle() != null && !b.getTitle().isBlank())
                                .toList()
                );
            }
            studentService.save(student);
            ra.addFlashAttribute("successMessage", "Student updated successfully!");
        } catch (Exception e) {
            ra.addFlashAttribute("errorMessage", "Failed to update student: " + e.getMessage());
        }
        return "redirect:/students/" + id;
    }

    // ─────────────────────────────────────────
    // DELETE student
    // ─────────────────────────────────────────
    @PostMapping("/{id}/delete")
    public String deleteStudent(@PathVariable int id,
                                RedirectAttributes ra,
                                HttpSession session) {
        if (isNotLoggedIn(session)) return "redirect:/login";
        try {
            studentService.delete(id);
            ra.addFlashAttribute("successMessage", "Student deleted successfully.");
        } catch (Exception e) {
            ra.addFlashAttribute("errorMessage", "Failed to delete student: " + e.getMessage());
        }
        return "redirect:/students";
    }
}
package nguyentoan.de180895.lab8_de180895.service;

import nguyentoan.de180895.lab8_de180895.entity.Student;
import nguyentoan.de180895.lab8_de180895.repo.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private StudentRepo studentRepo;
    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }
    public void save(Student student){
        if (student.getId() == 0) {
            int maxId = studentRepo.findAll()
                    .stream()
                    .mapToInt(Student::getId)
                    .max()
                    .orElse(0);
            student.setId(maxId + 1);
        }
        studentRepo.save(student);
    }
    public List<Student> findAll(){
        return studentRepo.findAll();
    }
    public void delete(int id){
        Student student = studentRepo.findById(id).orElseThrow();
        studentRepo.delete(student);
    }
//    public Student update(Student student){
//        return studentRepo.save(student);
//    }
    public Optional<Student> getStudentById(int id){
        return studentRepo.findById(id);
    }
    public boolean authenticate(String email, String password) {
        return studentRepo.findByEmail(email.trim())
                .map(s -> s.getPassword().equals(password))
                .orElse(false);
    }
}

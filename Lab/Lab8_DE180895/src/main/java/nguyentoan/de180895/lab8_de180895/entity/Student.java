package nguyentoan.de180895.lab8_de180895.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "student")
@Data
public class Student {
    @Id
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private int mark;
    private List<Book> books;
}

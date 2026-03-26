package nguyentoan.de180895.lab8_de180895.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "books")
@Data
public class Book {
    @Id
    private int id;
    private String title;
    private String author;
    private String isbn;
    private Set<Student> students ;
}

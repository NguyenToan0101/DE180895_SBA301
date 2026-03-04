package nguyentoan.de180895.lab7.entity;
import jakarta.persistence.*;
public class Book {
    @Entity
    @Table(name = "BOOKS")
    public class Book {

        @Id // Khóa chính (Primary Key)
        @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng giá trị ID
        private int id; // Corresponds to BOOKS(id)

        @Column(name = "title", length = 50)
        private String title; // Tiêu đề sách

        @Column(name = "author")
        private String author; // Tác giả

        @Column(name = "isbn", unique = true) // ISBN là duy nhất
        private String isbn; // Mã ISBN của sách

        // Mối quan hệ Many-to-One (Nhiều Book thuộc về Một Student)
        // Trường này tạo ra khóa ngoại (Foreign Key) 'student_id' trong bảng BOOKS
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "student_id", nullable = true) // Khóa ngoại trỏ đến Student
        private Student student;

    }


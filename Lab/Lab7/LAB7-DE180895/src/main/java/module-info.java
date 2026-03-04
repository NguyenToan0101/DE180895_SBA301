module LAB7_DE180895 {

    // 1. Yêu cầu (requires) các modules cần thiết

    // Modules JavaFX (Presentation Layer)
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;

    // Modules Persistence (Hibernate/JPA) và Database
    requires java.sql;                  // Cần cho JDBC Driver
    requires jakarta.persistence;       // Cần cho JPA Annotations
    requires org.hibernate.orm.core;    // Cần cho Hibernate Core

    // Module này có thể cần tùy thuộc vào phiên bản JavaFX bạn đang dùng, nếu không cần có thể bỏ qua
    requires java.naming;

    // 2. Mở quyền truy cập (opens) cho Reflection

    // Mở gói POJOs/Entity cho JavaFX Base để Data Binding hoạt động trong TableView
//    opens entity to javafx.base;

    // Mở gói Controller (giả sử nằm trong Main) cho FXML Loader
    opens controller to javafx.fxml;

    opens entity to org.hibernate.orm.core;
    // 3. Xuất (exports) các packages công khai

    // Xuất gói Main Application để runtime có thể khởi chạy
    exports controller;

    //
    // Xuất gói Services để tầng Presentation (Controller) có thể truy cập
    exports service;

    // Xuất gói POJOs để các thành phần bên ngoài (như TableView) có thể thấy lớp Entity
    exports entity;

    // Xuất gói Repository để tầng Service có thể truy cập
    exports repository;
    // Xuất gói DAO để tầng Repository có thể truy cập
    exports dao;
}

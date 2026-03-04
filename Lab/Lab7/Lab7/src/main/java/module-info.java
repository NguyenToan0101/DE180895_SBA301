module nguyentoan.de180895.lab7 {
    requires javafx.controls;
    requires javafx.fxml;
    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires org.hibernate.orm.core;
    requires jakarta.persistence;
    requires java.sql;


    opens nguyentoan.de180895.lab7 to javafx.fxml;
    exports nguyentoan.de180895.lab7;
}
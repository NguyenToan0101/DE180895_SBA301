package fu.se.sba301.phongtt.lab4.pojos;
//Employee (ID, Name, Designation, Salary)

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Employee {
    private String empId;
    private String name;
    private String designation;
    private double salary;
}

package nguyentoan.de180895.assignment3.service;

import nguyentoan.de180895.assignment3.dto.request.RegisterRequest;
import nguyentoan.de180895.assignment3.entity.Customer;
import nguyentoan.de180895.assignment3.entity.Role;
import nguyentoan.de180895.assignment3.repository.CustomerRepository;
import nguyentoan.de180895.assignment3.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Customer register(RegisterRequest request) {
        if (customerRepository.existsByEmailAddress(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        Customer customer = new Customer();
        customer.setCustomerFullName(request.getFullName());
        customer.setTelephone(request.getPhoneNumber());
        customer.setEmailAddress(request.getEmail());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setCustomerStatus("ACTIVE");

        // Gán role CUSTOMER mặc định
        Role customerRole = roleRepository.findByRoleName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        customer.setRoles(Set.of(customerRole));

        return customerRepository.save(customer);
    }
}

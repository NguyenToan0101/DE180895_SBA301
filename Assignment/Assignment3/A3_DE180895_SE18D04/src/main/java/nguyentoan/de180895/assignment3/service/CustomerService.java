package nguyentoan.de180895.assignment3.service;

import nguyentoan.de180895.assignment3.dto.request.RegisterRequest;
import nguyentoan.de180895.assignment3.dto.respone.CustomerResponse;
import nguyentoan.de180895.assignment3.entity.Customer;
import nguyentoan.de180895.assignment3.entity.Role;
import nguyentoan.de180895.assignment3.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Staff: lấy tất cả
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // Staff: cập nhật thông tin khách hàng
    public Customer updateCustomerByStaff(Long id, Customer updated) {
        Customer customer = getCustomerById(id);
        customer.setCustomerFullName(updated.getCustomerFullName());
        customer.setTelephone(updated.getTelephone());
        customer.setCustomerStatus(updated.getCustomerStatus());
        return customerRepository.save(customer);
    }

    // Customer: tự cập nhật profile
    public Customer updateProfile(String email, RegisterRequest request) {
        Customer customer = customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setCustomerFullName(request.getFullName());
        customer.setTelephone(request.getPhoneNumber());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            customer.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        return customerRepository.save(customer);
    }
    public List<CustomerResponse> toResponseList(List<Customer> customers) {

        return customers.stream().map(customer -> {

            CustomerResponse dto = new CustomerResponse();
            dto.setCustomerID(customer.getCustomerID());
            dto.setFullName(customer.getCustomerFullName());
            dto.setEmail(customer.getEmailAddress());
            dto.setPhoneNumber(customer.getTelephone());
            dto.setCustomerStatus(customer.getCustomerStatus());
            dto.setCustomerBirthday(customer.getCustomerBirthday());

            Set<String> roleNames = customer.getRoles()
                    .stream()
                    .map(Role::getRoleName)
                    .collect(Collectors.toSet());

            dto.setRoles(roleNames);

            return dto;

        }).collect(Collectors.toList());
    }
}
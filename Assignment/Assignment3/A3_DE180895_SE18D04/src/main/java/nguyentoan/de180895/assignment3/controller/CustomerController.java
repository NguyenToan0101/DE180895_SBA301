package nguyentoan.de180895.assignment3.controller;

import nguyentoan.de180895.assignment3.dto.request.RegisterRequest;
import nguyentoan.de180895.assignment3.dto.respone.CustomerResponse;
import nguyentoan.de180895.assignment3.entity.Customer;
import nguyentoan.de180895.assignment3.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // ===== STAFF =====
    @GetMapping("/api/staff/customers")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        return ResponseEntity.ok(customerService.toResponseList(customerService.getAllCustomers()));
    }

    @GetMapping("/api/staff/customers/{id}")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @PutMapping("/api/staff/customers/{id}")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomerByStaff(id, customer));
    }

    // ===== CUSTOMER =====
    @GetMapping("/api/customer/profile")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<Customer> getProfile(Authentication authentication) {
        return ResponseEntity.ok(
                customerService.getAllCustomers().stream()
                        .filter(c -> c.getEmailAddress().equals(authentication.getName()))
                        .findFirst().orElseThrow()
        );
    }

    @PutMapping("/api/customer/profile")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<Customer> updateProfile(
            Authentication authentication,
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(customerService.updateProfile(authentication.getName(), request));
    }
}
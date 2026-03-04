package nguyentoan.de180895.pe_sba301_sp25_be_de180895.controller;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.CarRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response.CarResponse;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/car")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final CarService carService;

    @PostMapping
    public ResponseEntity<CarResponse> createCar(@RequestBody CarRequest request) {
        return ResponseEntity.ok(carService.createCar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarResponse> updateCar(
            @PathVariable Long id,
            @RequestBody CarRequest request) {
        return ResponseEntity.ok(carService.updateCar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }
}
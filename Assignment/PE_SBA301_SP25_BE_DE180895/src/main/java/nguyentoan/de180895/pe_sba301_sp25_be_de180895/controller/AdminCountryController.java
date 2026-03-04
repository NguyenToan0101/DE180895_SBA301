package nguyentoan.de180895.pe_sba301_sp25_be_de180895.controller;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Country;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.service.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/country")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminCountryController {

    private final CountryService countryService;

    @PostMapping
    public Country create(@RequestBody Country country) {
        return countryService.create(country);
    }

    @PutMapping("/{id}")
    public Country update(@PathVariable Long id,
                          @RequestBody Country country) {
        return countryService.update(id, country);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        countryService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}

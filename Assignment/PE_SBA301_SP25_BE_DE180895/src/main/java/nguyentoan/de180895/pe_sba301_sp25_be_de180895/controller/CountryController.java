package nguyentoan.de180895.pe_sba301_sp25_be_de180895.controller;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Country;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.service.CountryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/country")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    @GetMapping
    public List<Country> getAll() {
        return countryService.getAll();
    }

    @GetMapping("/{id}")
    public Country getById(@PathVariable Long id) {
        return countryService.getById(id);
    }
}

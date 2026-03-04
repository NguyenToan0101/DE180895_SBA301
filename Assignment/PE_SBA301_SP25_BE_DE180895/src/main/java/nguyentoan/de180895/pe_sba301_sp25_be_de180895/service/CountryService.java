package nguyentoan.de180895.pe_sba301_sp25_be_de180895.service;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Country;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.CountryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryRepo countryRepository;

    public List<Country> getAll() {
        return countryRepository.findAll();
    }

    public Country getById(Long id) {
        return countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));
    }

    public Country create(Country country) {
        return countryRepository.save(country);
    }

    public Country update(Long id, Country updated) {
        Country country = getById(id);
        country.setCountryName(updated.getCountryName());
        return countryRepository.save(country);
    }

    public void delete(Long id) {
        Country country = getById(id);
        countryRepository.delete(country);
    }
}

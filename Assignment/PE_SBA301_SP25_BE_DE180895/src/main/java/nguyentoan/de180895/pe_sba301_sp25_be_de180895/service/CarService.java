package nguyentoan.de180895.pe_sba301_sp25_be_de180895.service;

import lombok.RequiredArgsConstructor;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.request.CarRequest;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.dto.response.CarResponse;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Car;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.entity.Country;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.CarRepo;
import nguyentoan.de180895.pe_sba301_sp25_be_de180895.repository.CountryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepo carRepository;
    private final CountryRepo countryRepository;

    // ===== READ ALL (PUBLIC) =====
    public List<CarResponse> getAllCars() {
        return carRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===== READ BY ID (PUBLIC) =====
    public CarResponse getCarById(Long id) {
        Car car = getCarEntity(id);
        return mapToResponse(car);
    }

    // ===== CREATE (ADMIN) =====
    public CarResponse createCar(CarRequest request) {

        Country country = countryRepository.findById(request.getCountryID())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        Car car = Car.builder()
                .carName(request.getCarName())
                .unitsInStock(request.getUnitsInStock())
                .unitPrice(request.getUnitPrice())
                .country(country)
                .build();

        return mapToResponse(carRepository.save(car));
    }

    // ===== UPDATE (ADMIN) =====
    public CarResponse updateCar(Long id, CarRequest request) {

        Car car = getCarEntity(id);

        Country country = countryRepository.findById(request.getCountryID())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        car.setCarName(request.getCarName());
        car.setUnitsInStock(request.getUnitsInStock());
        car.setUnitPrice(request.getUnitPrice());
        car.setCountry(country);

        return mapToResponse(carRepository.save(car));
    }

    // ===== DELETE (ADMIN) =====
    public void deleteCar(Long id) {
        Car car = getCarEntity(id);
        carRepository.delete(car);
    }

    private Car getCarEntity(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }

    private CarResponse mapToResponse(Car car) {
        return CarResponse.builder()
                .carID(car.getCarID())
                .carName(car.getCarName())
                .unitsInStock(car.getUnitsInStock())
                .unitPrice(car.getUnitPrice())
                .countryName(car.getCountry().getCountryName())
                .createdAt(car.getCreatedAt())
                .updatedAt(car.getUpdatedAt())
                .build();
    }
}

package nguyentoan.de180895.lab4new.services;

import nguyentoan.de180895.lab4new.entity.Orchid;
import nguyentoan.de180895.lab4new.exception.ResourceNotFoundException;
import nguyentoan.de180895.lab4new.repositories.OrchidRepository;
import org.springframework.stereotype.Service;

@Service
public class OrchidService {
    private final OrchidRepository orchidRepository;

    public OrchidService(OrchidRepository orchidRepository) {
        this.orchidRepository = orchidRepository;
    }
    public void saveOrchid(Orchid orchid){
        orchidRepository.save(orchid);
    }
    public Iterable<Orchid> getAllOrchids(){
        return orchidRepository.findAll();
    }
    public Orchid getOrchidById(Long id){
        return orchidRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Orchid with id " + id + " not found"));
    }
    public void deleteOrchidById(Long id){
        if (!orchidRepository.existsById(id)) {
            throw new ResourceNotFoundException("Orchid with id " + id + " not found");
        }
        orchidRepository.deleteById(id);
    }
    public void updateOrchid(Orchid orchid){

        orchidRepository.save(orchid);
    }

}

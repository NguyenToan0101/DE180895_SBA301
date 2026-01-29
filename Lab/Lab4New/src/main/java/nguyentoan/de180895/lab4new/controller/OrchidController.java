package nguyentoan.de180895.lab4new.controller;

import nguyentoan.de180895.lab4new.entity.Category;
import nguyentoan.de180895.lab4new.entity.Orchid;
import nguyentoan.de180895.lab4new.services.CategoryService;
import nguyentoan.de180895.lab4new.services.OrchidService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final OrchidService orchidService;
    private final CategoryService categoryService;
    public OrchidController(OrchidService orchidService, CategoryService categoryService) {
        this.orchidService = orchidService;
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public Iterable<Orchid> getAllOrchids(){
        return orchidService.getAllOrchids();
    }
    @PostMapping("/")
    @ResponseStatus(code = org.springframework.http.HttpStatus.CREATED)
    public ResponseEntity<List<Orchid>> saveOrchid(@RequestBody Orchid orchid){
        orchidService.saveOrchid(orchid);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/")
    public void updateOrchid(@RequestBody Orchid orchid){
        orchidService.updateOrchid(orchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchidById(@PathVariable Long id){
        orchidService.deleteOrchidById(id);
        return ResponseEntity.ok("Deleted");
    }
    @GetMapping("/{id}")
    public Orchid getOrchidById(@PathVariable Long id){
        return orchidService.getOrchidById(id);
    }
    @GetMapping("/categories")
    public Iterable<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
}

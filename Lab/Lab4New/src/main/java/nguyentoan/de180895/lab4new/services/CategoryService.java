package nguyentoan.de180895.lab4new.services;

import nguyentoan.de180895.lab4new.entity.Category;
import nguyentoan.de180895.lab4new.repositories.CategoryRepo;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private final CategoryRepo categoryRepo;
    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    public Iterable<Category> getAllCategories(){
        return categoryRepo.findAll();
    }
}

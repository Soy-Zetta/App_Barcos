package com.g8.jpa.controller;

import com.g8.jpa.entity.Category;
import com.g8.jpa.service.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CALM
 */
@RestController
@RequestMapping("/Category")
@CrossOrigin(origins = "*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/all")
    public List<Category> getCategory(){
        return categoryService.getCategory();
    }
    
    @PostMapping("/save")
    public ResponseEntity insertCategory(@RequestBody Category categoria){
       categoryService.insertCategory(categoria);
       return ResponseEntity.status(201).build();
    }
    
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable("id") Long id){
        return categoryService.getCategoryById(id);
    }
}


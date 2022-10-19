package com.g8.jpa.repository;

import com.g8.jpa.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author CALM
 */
public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}

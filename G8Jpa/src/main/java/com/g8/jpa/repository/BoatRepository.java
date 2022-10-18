package com.g8.jpa.repository;

import com.g8.jpa.entity.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author CALM
 */
public interface BoatRepository extends JpaRepository<Boat,Long>{
    
}

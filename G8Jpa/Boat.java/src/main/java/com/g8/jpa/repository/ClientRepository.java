package com.g8.jpa.repository;

import com.g8.jpa.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author CALM
 */
public interface ClientRepository extends JpaRepository<Client, Long>{
    
}

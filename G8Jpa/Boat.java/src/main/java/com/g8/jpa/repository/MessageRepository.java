package com.g8.jpa.repository;

import com.g8.jpa.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author CALM
 */
public interface MessageRepository extends JpaRepository<Message, Long>{
    
}

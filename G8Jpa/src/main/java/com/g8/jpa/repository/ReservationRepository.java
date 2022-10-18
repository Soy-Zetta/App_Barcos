package com.g8.jpa.repository;

import com.g8.jpa.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author CALM
 */
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    
}

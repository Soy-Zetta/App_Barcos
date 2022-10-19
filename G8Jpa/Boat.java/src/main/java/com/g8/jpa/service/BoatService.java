package com.g8.jpa.service;

import com.g8.jpa.entity.Boat;
import com.g8.jpa.repository.BoatRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CALM
 */
@Service
public class BoatService {
    @Autowired
    private BoatRepository boatRepository;
    
    public List<Boat> getBoatList(){
        return boatRepository.findAll();
    }
    
    public Boat getBoatById(Long id){
        return boatRepository.findById(id).get();
    }
    
    public Boat insertBoat(Boat boat){
        return boatRepository.save(boat);
    }
    
    public void deleteBoat(Long id){
       boatRepository.deleteById(id);               
    }
    
    public Boat updateBoat(Boat boat){
        //la boat existe
        if (boat.getId()!=null){
            //validamos si la boat existe
            Optional<Boat> opcional =  boatRepository.findById(boat.getId());
            
            //la boat no existe
            if (opcional.isEmpty()) return boat;
            //si la boat existe
            else{
               Boat boatDB = opcional.get();
               
               boatDB.setBrand(boat.getBrand());
               boatDB.setYear(boat.getYear());
               boatDB.setCategory(boat.getCategory());
               boatDB.setName(boat.getName());
               boatDB.setDescription(boat.getDescription());
               return boatRepository.save(boatDB);
            }
        }
        return boat;
    }
}

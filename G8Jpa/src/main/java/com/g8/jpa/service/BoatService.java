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

    public List<Boat> getBoatList() {
        return boatRepository.findAll();
    }

    public Boat getBoatById(Long id) {
        return boatRepository.findById(id).get();
    }

    public Boat insertBoat(Boat boat) {
        return boatRepository.save(boat);
    }

    public void deleteBoat(Long id) {
        boatRepository.deleteById(id);
    }

    public Boat updateBoat(Boat boat) {

        if (boat.getId() != null) {
            Optional<Boat> opcional = boatRepository.findById(boat.getId());

            if (opcional.isEmpty()) {
                return boat;
            } else {
                Boat boatDB = opcional.get();

                if (boat.getBrand() != null) {
                    boatDB.setBrand(boat.getBrand());
                }
                if (boat.getYear() != null) {
                    boatDB.setYear(boat.getYear());
                }
                if (boat.getCategory() != null) {
                    boatDB.setCategory(boat.getCategory());
                }
                if (boat.getName() != null) {
                    boatDB.setName(boat.getName());
                }
                if (boat.getDescription() != null) {
                    boatDB.setDescription(boat.getDescription());
                }
                return boatRepository.save(boatDB);
            }
        }
        return boat;
    }
}

package com.g8.jpa.controller;

import com.g8.jpa.entity.Boat;
import com.g8.jpa.service.BoatService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CALM
 */
    @RestController
    @RequestMapping("/Boat")
    @CrossOrigin(origins = "*")
    public class BoatController {

        @Autowired
        private BoatService boatService;

        @GetMapping("/all")
        public List<Boat> getBoatList() {
            return boatService.getBoatList();
        }

        @GetMapping("/{id}")
        public Boat getBoatById(@PathVariable("id") Long id) {
            return boatService.getBoatById(id);
        }

        @PostMapping("/save")
        public ResponseEntity insertBoat(@RequestBody Boat boat) {
            boatService.insertBoat(boat);
            return ResponseEntity.status(201).build();
        }

        @PutMapping("/update")
        public ResponseEntity updateBoat(@RequestBody Boat boat) {
            boatService.updateBoat(boat);
            return ResponseEntity.status(201).build();
        }

        @DeleteMapping("/delete/{id}")
        public ResponseEntity deleteBoat(@PathVariable("id") Long id) {
            boatService.deleteBoat(id);
            return ResponseEntity.status(204).build();
        }
    }
package com.g8.jpa.controller;

import com.g8.jpa.entity.Client;
import com.g8.jpa.service.ClientService;
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
@RequestMapping("/Client")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public List<Client> getCategory() {
        return clientService.getClient();
    }

    @PostMapping("/save")
    public ResponseEntity insertClient(@RequestBody Client client) {
        clientService.insertClient(client);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable("id") Long id) {
        return clientService.getClientById(id);
    }
}


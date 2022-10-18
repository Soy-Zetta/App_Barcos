package com.g8.jpa.service;

import com.g8.jpa.entity.Client;
import com.g8.jpa.repository.ClientRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CALM
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getClient() {
        return clientRepository.findAll();
    }

    public Client insertClient(Client client) {
        return clientRepository.save(client);
    }

    //Metodo para consultar una registo x su id (Capa de servicios)
    public Client getClientById(Long id) {
        return clientRepository.findById(id).get();
    }
}

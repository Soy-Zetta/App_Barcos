package com.g8.jpa.service;

import com.g8.jpa.entity.Message;
import com.g8.jpa.repository.MessageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CALM
 */
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getMessage() {
        return messageRepository.findAll();
    }

    public Message insertMessage(Message message) {
        return messageRepository.save(message);
    }

    //Metodo para consultar una registo x su id (Capa de servicios)
    public Message getMessageById(Long id) {
        return messageRepository.findById(id).get();
    }
}

package com.g8.jpa.service;

import com.g8.jpa.entity.Message;
import com.g8.jpa.repository.MessageRepository;
import java.util.List;
import java.util.Optional;
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

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    public Message updateMessage(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> opcional = messageRepository.findById(message.getIdMessage());

            if (opcional.isEmpty()) {
                return message;
            } else {
                Message msgDB = opcional.get();

                if (message.getMessageText() != null) {
                    msgDB.setMessageText(message.getMessageText());
                }
                if (message.getClient() != null) {
                    msgDB.setClient(message.getClient());
                }
                if (message.getBoat() != null) {
                    msgDB.setBoat(message.getBoat());
                }

                return messageRepository.save(msgDB);
            }
        }
        return message;
    }
}

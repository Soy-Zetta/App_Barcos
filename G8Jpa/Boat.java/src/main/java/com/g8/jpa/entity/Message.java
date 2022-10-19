package com.g8.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author CALM
 */
@Entity
public class Message  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMessage;
    @Column(nullable = false, length = 255)
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "boat_id")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Boat boat;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Client client;

    /**
     * @return the idMessage
     */
    public Long getIdMessage() {
        return idMessage;
    }

    /**
     * @param idMessage the idMessage to set
     */
    public void setIdMessage(Long idMessage) {
        this.idMessage = idMessage;
    }

    /**
     * @return the messageText
     */
    public String getMessageText() {
        return messageText;
    }

    /**
     * @param messageText the messageText to set
     */
    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    /**
     * @return the client
     */
    public Client getClient() {
        return client;
    }

    /**
     * @param client the client to set
     */
    public void setClient(Client client) {
        this.client = client;
    }

    /**
     * @return the boat
     */
    public Boat getBoat() {
        return boat;
    }

    /**
     * @param boat the boat to set
     */
    public void setBoat(Boat boat) {
        this.boat = boat;
    }
}


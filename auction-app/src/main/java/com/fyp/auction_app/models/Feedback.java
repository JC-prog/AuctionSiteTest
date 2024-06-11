package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedback_id;

    private Integer sender_id;

    private String message;

    private Date feedback_timestamp;

    // Constructor
    public Feedback() {

    }

    // Constructor
    public Feedback(
            Integer sender_id,
            String message,
            Date feedback_timestamp
    ) {
        this.sender_id = sender_id;
        this.message = message;
        this.feedback_timestamp = feedback_timestamp;
    }

    // Getter and Setter
    public Integer getFeedbackId() {
        return feedback_id;
    }

    public void setFeedbackId(Integer feedback_id) {
        this.feedback_id = feedback_id;
    }

    public Integer getSender_id() {
        return sender_id;
    }

    public void setSenderId(Integer sender_id) {
        this.sender_id = sender_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getFeebackTimestamp() {
        return feedback_timestamp;
    }

    public void setFeedbackTimestamp(Date feedback_timestamp) {
        this.feedback_timestamp = feedback_timestamp;
    }

}

package com.example.EventManagement.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    @ManyToOne
    private User organiser;

    
    public Event() {}

    public Event(String title, String description, String location,
                 LocalDateTime startDateTime, LocalDateTime endDateTime, User organiser) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.organiser = organiser;
    }

    public Event(String title, String description, String location,
                 LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public User getOrganiser() {
        return organiser;
    }

    public void setOrganiser(User organiser) {
        this.organiser = organiser;
    }
}

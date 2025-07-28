package com.example.EventManagement.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EventManagement.model.Event;
import com.example.EventManagement.services.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventService eventService;

    //Admin only
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.creatEvent(event);
    }

    //public
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getallEvents();
    }

    //public
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Admin only
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event existingEvent = eventService.getEventById(id);
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setStartDateTime(updatedEvent.getStartDateTime());
        existingEvent.setEndDateTime(updatedEvent.getEndDateTime());
        return eventService.creatEvent(existingEvent);
    }

    //Admin only
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    // Admin only
    @PostMapping("/create-default-events")
    public String createDefaultEvents() {
        if (eventService.getallEvents().isEmpty()) {
            eventService.creatEvent(new Event(
                    "🎉 Music Fest 2025",
                    "Live concert with top artists.",
                    "Mumbai Stadium",
                    LocalDateTime.now().plusDays(10),
                    LocalDateTime.now().plusDays(10).plusHours(4)
            ));

            eventService.creatEvent(new Event(
                    "💻 Tech Conference",
                    "Talks and workshops on AI, ML, and Web3.",
                    "Delhi Tech Hub",
                    LocalDateTime.now().plusDays(15),
                    LocalDateTime.now().plusDays(15).plusHours(6)
            ));

            eventService.creatEvent(new Event(
                    "🍔 Food Carnival",
                    "Taste the best street foods and desserts.",
                    "Bangalore Food Street",
                    LocalDateTime.now().plusDays(20),
                    LocalDateTime.now().plusDays(20).plusHours(5)
            ));

            eventService.creatEvent(new Event(
                    "🚀 Startup Pitch Day",
                    "Startups pitch to investors and VCs.",
                    "Hyderabad Innovation Center",
                    LocalDateTime.now().plusDays(25),
                    LocalDateTime.now().plusDays(25).plusHours(3)
            ));

            eventService.creatEvent(new Event(
                    "🎨 Art Exhibition",
                    "Modern and classic art showcase.",
                    "Kolkata Art Gallery",
                    LocalDateTime.now().plusDays(30),
                    LocalDateTime.now().plusDays(30).plusHours(4)
            ));

            eventService.creatEvent(new Event(
                    "🤝 Community Meetup",
                    "Networking event for local communities.",
                    "Chennai Convention Center",
                    LocalDateTime.now().plusDays(35),
                    LocalDateTime.now().plusDays(35).plusHours(2)
            ));

            return " Default events created successfully.";
        } else {
            return " Events already exist in the database.";
        }
    }
}

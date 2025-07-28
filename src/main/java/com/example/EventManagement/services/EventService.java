package com.example.EventManagement.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EventManagement.model.Event;
import com.example.EventManagement.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event creatEvent(Event event)
    {
        return eventRepository.save(event);
    }

    public List<Event>getallEvents()
    {
        return eventRepository.findAll();

    }
    
    public Event getEventById(Long id)
    {
        return eventRepository.findById(id).orElseThrow();

    }

    public void deleteEvent(Long id)
    {
        eventRepository.deleteById(id);;
    }

    public void createDefaultEventsIfEmpty() {
        if (eventRepository.count() == 0) {
            creatEvent(new Event(
                    "🎉 Music Fest 2025",
                    "Live concert with top artists.",
                    "Mumbai Stadium",
                    LocalDateTime.now().plusDays(10),
                    LocalDateTime.now().plusDays(10).plusHours(4)
            ));

            creatEvent(new Event(
                    "💻 Tech Conference",
                    "Talks and workshops on AI, ML, and Web3.",
                    "Delhi Tech Hub",
                    LocalDateTime.now().plusDays(15),
                    LocalDateTime.now().plusDays(15).plusHours(6)
            ));

            creatEvent(new Event(
                    "🍔 Food Carnival",
                    "Taste the best street foods and desserts.",
                    "Bangalore Food Street",
                    LocalDateTime.now().plusDays(20),
                    LocalDateTime.now().plusDays(20).plusHours(5)
            ));

            creatEvent(new Event(
                    "🚀 Startup Pitch Day",
                    "Startups pitch to investors and VCs.",
                    "Hyderabad Innovation Center",
                    LocalDateTime.now().plusDays(25),
                    LocalDateTime.now().plusDays(25).plusHours(3)
            ));

            creatEvent(new Event(
                    "🎨 Art Exhibition",
                    "Modern and classic art showcase.",
                    "Kolkata Art Gallery",
                    LocalDateTime.now().plusDays(30),
                    LocalDateTime.now().plusDays(30).plusHours(4)
            ));

            creatEvent(new Event(
                    "🤝 Community Meetup",
                    "Networking event for local communities.",
                    "Chennai Convention Center",
                    LocalDateTime.now().plusDays(35),
                    LocalDateTime.now().plusDays(35).plusHours(2)
            ));
        }
    }
}

package com.example.EventManagement.controller;

import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.EventManagement.model.Event;
import com.example.EventManagement.model.RegistrationRequest;
import com.example.EventManagement.model.User;
import com.example.EventManagement.Dto.RegistrationRequestDTO;
import com.example.EventManagement.repository.EventRepository;
import com.example.EventManagement.repository.RegistrationRequestRepository;
import com.example.EventManagement.repository.UserRepository;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRequestRepository registrationRequestRepository;

    //register for an event
    @PostMapping("/{eventId}")
    public ResponseEntity<String> registerForEvent(@PathVariable Long eventId, Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        boolean alreadyRegistered = registrationRequestRepository.existsByUserAndEvent(user, event);
        if (alreadyRegistered) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Already registered for this event.");
        }

        RegistrationRequest request = new RegistrationRequest(user, event, "PENDING");
        registrationRequestRepository.save(request);
        return ResponseEntity.ok("Event registration submitted. Awaiting admin approval.");
    }

    // view all events the user has registered for
    @GetMapping("/my-registrations")
    public ResponseEntity<List<RegistrationRequestDTO>> getUserRegistrations(Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<RegistrationRequest> requests = registrationRequestRepository.findByUser(user);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        List<RegistrationRequestDTO> dtoList = requests.stream()
                .map(req -> new RegistrationRequestDTO(
                        req.getId(),
                        req.getUser().getName(),
                        req.getUser().getEmail(),
                        req.getEvent().getTitle(),
                        req.getStatus(),
                        req.getCreatedAt().format(formatter)
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}

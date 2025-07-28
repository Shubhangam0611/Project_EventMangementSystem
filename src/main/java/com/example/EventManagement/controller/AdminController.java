package com.example.EventManagement.controller;

import com.example.EventManagement.Dto.RegistrationRequestDTO;
import com.example.EventManagement.model.RegistrationRequest;
import com.example.EventManagement.repository.RegistrationRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private RegistrationRequestRepository registrationRequestRepo;

    @GetMapping("/requests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<RegistrationRequestDTO>> getAllRequests() {
        List<RegistrationRequest> requests = registrationRequestRepo.findAllByOrderByCreatedAtDesc();

        LocalDateTime cutoff = LocalDateTime.now().minusDays(2);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        List<RegistrationRequestDTO> dtoList = requests.stream()
                .map(req -> new RegistrationRequestDTO(
                        req.getId(),
                        req.getUser().getName(),
                        req.getUser().getEmail(),
                        req.getEvent().getTitle(),
                        req.getStatus(),
                        req.getCreatedAt() != null
                                ? req.getCreatedAt().format(formatter)
                                : "N/A"
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    @PutMapping("/requests/{id}/approve")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> approveRequest(@PathVariable Long id) {
        RegistrationRequest request = registrationRequestRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException
                                   (HttpStatus.NOT_FOUND, "Request not found"));

        request.setStatus("APPROVED");
        registrationRequestRepo.save(request);
        return ResponseEntity.ok("Request approved successfully.");
    }

    @PutMapping("/requests/{id}/reject")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id) {
        RegistrationRequest request = registrationRequestRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        request.setStatus("REJECTED");
        registrationRequestRepo.save(request);
        return ResponseEntity.ok("Request rejected successfully.");
    }
}

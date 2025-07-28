package com.example.EventManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventManagement.model.Event;
import com.example.EventManagement.model.RegistrationRequest;
import com.example.EventManagement.model.User;

public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Long> {
    List<RegistrationRequest> findByStatus(String status);


  boolean existsByUserAndEvent(User user, Event event); 


    List<RegistrationRequest> findByUser(User user);

    List<RegistrationRequest> findAllByOrderByCreatedAtDesc();

}

    


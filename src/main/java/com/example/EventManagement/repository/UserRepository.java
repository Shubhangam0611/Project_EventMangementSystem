package com.example.EventManagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventManagement.model.User;

public interface UserRepository extends JpaRepository<User,Long> 
{
  Optional<User>findByEmail(String email);

  boolean existsByEmail(String email);
}

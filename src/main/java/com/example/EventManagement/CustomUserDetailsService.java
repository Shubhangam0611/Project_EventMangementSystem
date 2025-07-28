package com.example.EventManagement;

import com.example.EventManagement.model.User;
import com.example.EventManagement.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Authenticating user: " + email);

        User user = userRepo.findByEmail(email)
              .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

    
        String role = user.getRole() != null ? user.getRole() : "USER";

        System.out.println("Granted Authority: " + role);

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority(role))
        );
    }
}

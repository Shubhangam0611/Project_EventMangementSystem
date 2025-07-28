package com.example.EventManagement.controller;

import com.example.EventManagement.JwtSecurity.JwtUtil;
import com.example.EventManagement.model.User;
import com.example.EventManagement.repository.UserRepository;
import com.example.EventManagement.request.LoginRequest;
import com.example.EventManagement.request.RegisterRequest;
import com.example.EventManagement.Dto.UserResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

            
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

            UserResponseDTO userDTO = new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCompanyName(),
                user.getJobTitle(),
                user.getRole()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("user", userDTO);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        String role = request.getEmail().equalsIgnoreCase
                                         ("admin@EventHub.com") ? "ADMIN" : "USER";

        User user = new User(
            request.getName(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getCompanyName(),
            request.getJobTitle()
        );
        user.setRole(role);

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
}

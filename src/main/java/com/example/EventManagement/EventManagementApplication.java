package com.example.EventManagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import com.example.EventManagement.services.EventService;


@SpringBootApplication
@ComponentScan(basePackages = "com.example.EventManagement.")
@EnableMethodSecurity(prePostEnabled = true)
public class EventManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventManagementApplication.class, args);
	}
   
	  @Bean
    public CommandLineRunner seedEvents(EventService eventService) {
        return args -> {
            eventService.createDefaultEventsIfEmpty();
        };
    }
}

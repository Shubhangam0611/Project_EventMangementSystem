package com.example.EventManagement.Dto;

public class RegistrationRequestDTO {
    private long id;
    private String userName;
    private String userEmail;
    private String eventName;
    private String status;
    private String createdAt;

    public RegistrationRequestDTO(Long id,
                                  String userName,
                                  String userEmail,  
                                  String eventName, 
                                  String status,
                                  String createdAt)
                                  {
                                    this.id=id;
                                    this.userName=userName;
                                    this.userEmail=userEmail;
                                    this.eventName=eventName;
                                    this.status=status;
                                    this.createdAt=createdAt;
                                  }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    

}

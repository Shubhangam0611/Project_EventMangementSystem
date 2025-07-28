package com.example.EventManagement.Dto;

public class UserResponseDTO {


    private Long id;
    private String name;
    private String email;
    private String companyName;
    private String jobTitle;
    private String role;

    public UserResponseDTO(Long id, String name, String email, String companyName, String jobTitle, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    

}

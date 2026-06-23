package com.social.usermgmt.dto;


import java.time.LocalDate;
import java.time.LocalDateTime;
public record ProfileResponse(
        Long id,
        Long userId,
        String fName,
        String lName,
        String email,
        String mobile,
        String avatarUrl,
        String city,
        String country,
        String gender,
        LocalDate dob,
         LocalDateTime createdAt,
        LocalDateTime updatedAt

) {
}
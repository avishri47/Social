package com.social.usermgmt.dto;

import java.time.LocalDate;

public record SignupRequest(
        String name,
        String email,
        String mobile,
        String gender,
        LocalDate dob,
        String password

) {
}
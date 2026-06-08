package com.social.usermgmt.dto;

import java.time.LocalDate;

public record SigninRequest(String email,
                            String password) {
}

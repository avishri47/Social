package com.social.usermgmt.dto;

public record SigninResponse(
    Long userId,
    String name,
    String profilePicUrl,
    String gender,
    String message,
    String accessToken
) {
}
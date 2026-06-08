package com.social.usermgmt.dto;

public record SigninResponse(
    Long userId,
    String message,
    String accessToken
) {
}
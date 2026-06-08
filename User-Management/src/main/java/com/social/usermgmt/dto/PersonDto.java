package com.social.usermgmt.dto;

public record PersonDto(
    Long userId,
    String message,
    String accessToken
) {
}
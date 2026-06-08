package com.social.usermgmt.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "profiles", indexes = {@Index(name = "idx_profile_username", columnList = "username"), @Index(name = "idx_profile_city", columnList = "city")})
@Data
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "display_name", length = 100)
    private String displayName;

    @Column(length = 500)
    private String bio;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    private String city;

    private String country;

    private LocalDate dateOfBirth;

    private Boolean profilePublic = true;
    private String gender;
    private LocalDate dob;
}
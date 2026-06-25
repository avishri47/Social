package com.social.usermgmt.controller;


import com.social.usermgmt.dto.ProfileRequest;
import com.social.usermgmt.dto.ProfileResponse;
import com.social.usermgmt.service.ProfileService;
import com.social.usermgmt.service.impl.ProfileServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private static final Logger log =  LoggerFactory.getLogger(ProfileController.class);

    @GetMapping("{id}")
    public ResponseEntity<ProfileResponse> getMyProfile(@PathVariable Long id) {

        return ResponseEntity.ok(profileService.getMyProfile(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProfileResponse> updateProfile(@RequestBody ProfileRequest request,@PathVariable Long id) {
        profileService.updateProfile(request,id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping( value = "/upload-avatar/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file,@PathVariable Long id) {
        log.info("upload avatar with id {}", id);
        if (file.isEmpty()) {
            log.info("pic is empty");
            return ResponseEntity.badRequest().body("Picture is empty");
        }

        return ResponseEntity.ok(   profileService.uploadFile(file,id));

    }







}
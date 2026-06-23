package com.social.usermgmt.controller;


import com.social.usermgmt.dto.ProfileRequest;
import com.social.usermgmt.dto.ProfileResponse;
import com.social.usermgmt.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("{id}")
    public ResponseEntity<ProfileResponse> getMyProfile(@PathVariable Long id) {

        return ResponseEntity.ok(profileService.getMyProfile(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProfileResponse> updateProfile(@RequestBody ProfileRequest request,@PathVariable Long id) {
        profileService.updateProfile(request,id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/upload-avatar")
    public ResponseEntity<String> uploadAvatar(@RequestPart("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        return ResponseEntity.ok(   profileService.uploadFile(file));

    }
}
package com.social.usermgmt.service.impl;

import com.social.usermgmt.domain.Profile;
import com.social.usermgmt.domain.User;
import com.social.usermgmt.dto.ProfileRequest;
import com.social.usermgmt.dto.ProfileResponse;
import com.social.usermgmt.dto.SignupRequest;
import com.social.usermgmt.dto.SignupResponse;
import com.social.usermgmt.mapper.ProfileMapper;
import com.social.usermgmt.repository.ProfileRepository;
import com.social.usermgmt.repository.UserRepository;
import com.social.usermgmt.service.ProfileService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    @Value("${upload.avatar.dir}")
private String UPLOAD_DIR;
    private static final Logger log =  LoggerFactory.getLogger(ProfileServiceImpl.class);

    private final ProfileRepository profileRepository;
    private final ProfileMapper  profileMapper;
    private final UserRepository userRepository;
    @Override
    public void updateProfile(ProfileRequest request, Long id) {
        Profile profile =profileRepository.findById(id).orElseThrow(()->new RuntimeException("Profile does not exist"));
        profile=  profileMapper.toEntity(request);
        profile.setUpdatedAt(LocalDateTime.now());
        profileRepository.save(profile);
    }

    @Override
    @Transactional
    public ProfileResponse getMyProfile(Long userId) {
        Profile profile = null;
        log.info("Getting My Profile for user id {}", userId);
        profile = profileRepository.findByUserId(userId).orElse(null);
        if(profile == null) {
            User user  = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found with userId :"+userId));
            String[] parts =  user.getName().trim().split("\\s+");


            String lastName  = parts.length > 1 ? parts[parts.length - 1] : "";
            profile = new Profile();
            String firstName = parts.length > 0 ? parts[0] : "";
            profile.setMobile(user.getMobileNumber());
             profile.setEmail(user.getEmail());
             profile.setfName(firstName);
             profile.setlName(lastName);
             profile.setUserId(user.getId());
             profile.setCreatedAt(LocalDateTime.now());
           profile =  profileRepository.save(profile);
        }

        ProfileResponse response = profileMapper.toDto(profile);


        return response;
    }

    @Override
    public String uploadFile(MultipartFile file,Long id) {
        // Create directory if not exists
        log.info("Uploading to directory {}", UPLOAD_DIR);
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Build file path
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fileUrl = ServletUriComponentsBuilder

                .fromPath("/uploads/avatar/")
                .path(fileName)
                .toUriString();
        log.info("file url {}", fileUrl);
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
log.info("profile found with id {}", profile.getId());
        profile.setAvatarUrl(fileUrl);
        profileRepository.save(profile);

        return fileUrl;
    }





}

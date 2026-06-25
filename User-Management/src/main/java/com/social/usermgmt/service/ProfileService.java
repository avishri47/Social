package com.social.usermgmt.service;

import com.social.usermgmt.dto.ProfileRequest;
import com.social.usermgmt.dto.ProfileResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

 void updateProfile(ProfileRequest request,Long id);

 ProfileResponse getMyProfile(Long userId);

 String uploadFile(MultipartFile file, Long id);

}

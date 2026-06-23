package com.social.usermgmt.service.impl;

import com.social.usermgmt.domain.Profile;
import com.social.usermgmt.domain.User;
import com.social.usermgmt.dto.*;
import com.social.usermgmt.exception.InvalidCredentialsException;
import com.social.usermgmt.exception.UserAlreadyExistsException;
import com.social.usermgmt.repository.ProfileRepository;
import com.social.usermgmt.repository.UserRepository;
import com.social.usermgmt.service.UserMgmtService;
import com.social.usermgmt.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserMgmtServiceImpl implements UserMgmtService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @Transactional
    public SignupResponse signup(SignupRequest request) {
       /* if (!request.password().equals(request.confirmPassword())) {
            throw new RuntimeException("Password and Confirm Password do not match");
        }*/
        if (request.mobile() != null &&
                userRepository.existsByMobileNumber(request.mobile())) {
            throw new RuntimeException("Mobile already registered");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException("User already exists");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setMobileNumber(request.mobile());

        user.setPassword(passwordEncoder.encode(request.password()));


        user = userRepository.save(user);
        Profile profile = new Profile();
        profile.setUserId(user.getId());

        String[] parts =  request.name().trim().split("\\s+");


        String firstName = parts.length > 0 ? parts[0] : "";
        String lastName  = parts.length > 1 ? parts[parts.length - 1] : "";
        profile.setfName(firstName);
        profile.setlName(lastName);
        profile.setGender(request.gender());
        profile.setDob(request.dob());
        profile.setMobile(request.mobile());
        profile.setEmail(request.email());
        profileRepository.save(profile);

        return new SignupResponse(user.getId(),"Signed up successfully");
    }

    @Override
    public SigninResponse signin(SigninRequest request) {
       User user = userRepository.findByEmail(request.email()).orElseThrow(()->new InvalidCredentialsException("id or password is wrong"));

        if ( !passwordEncoder.matches(request.password(), user.getPassword())) {
     throw new InvalidCredentialsException("Invalid credentials");
        }
        String accessToken =
                jwtUtil.generateToken(request.email());
        String profilePicUrl = null;
        String gender = null;
//        Profile profile = profileRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new RuntimeException("account dont exist or create a new account"));
        Profile profile = profileRepository.findByUserId(user.getId()).orElseGet(Profile::new);
       profilePicUrl = profile.getAvatarUrl();
         gender = profile.getGender();
        return new SigninResponse(user.getId(), user.getName(), profilePicUrl,gender,"Signed In successfully",accessToken);
    }

    @Override
    public SignoutResponse signout() {

        return new SignoutResponse("Signed out successfully \n see you soon");
    }
}

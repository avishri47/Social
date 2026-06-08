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
        profile.setUsername(request.name());
        profile.setDisplayName(request.name());
        profile.setGender(request.gender());
        profile.setDob(request.dob());

        profileRepository.save(profile);

        return new SignupResponse(user.getId(),"Signed up successfully");
    }

    @Override
    public SigninResponse signin(SigninRequest request) {
       User user = userRepository.findByEmail(request.email()).orElseThrow(()->new InvalidCredentialsException("Invalid id"));

        if ( !passwordEncoder.matches(request.password(), user.getPassword())) {
     throw new InvalidCredentialsException("Invalid credentials");
        }
        String accessToken =
                jwtUtil.generateToken(request.email());

        return new SigninResponse(user.getId(),"Signed In successfully",accessToken);
    }

    @Override
    public SignoutResponse signout() {

        return new SignoutResponse("Signed out successfully \n see you soon");
    }
}

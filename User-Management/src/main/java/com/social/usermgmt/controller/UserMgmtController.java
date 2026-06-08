package com.social.usermgmt.controller;

import com.social.usermgmt.dto.*;
import com.social.usermgmt.service.UserMgmtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserMgmtController {
    private final UserMgmtService userMgmtService;
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(
            @RequestBody SignupRequest request) {



        return ResponseEntity.ok(userMgmtService.signup(request));
    }
    @PostMapping("/signin")
    public ResponseEntity<SigninResponse> signIn(
            @RequestBody SigninRequest request) {
        SigninResponse response = userMgmtService.signin(request);
        ResponseCookie cookie = ResponseCookie.from("token", response.accessToken())
                .httpOnly(true)
                .secure(false)      // set false only for local HTTP dev
                .path("/")
                .maxAge(Duration.ofMinutes(30))
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
    }

    @PostMapping("/signout")
    public ResponseEntity<SignoutResponse> logout() {

        userMgmtService.signout();
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)      // set false only for local HTTP dev
                .path("/")
                .maxAge(Duration.ZERO)
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                       cookie.toString())
                .build();
    }
   /* @GetMapping("/search")
    public List<UserDto> searchPeople(
            @RequestParam String q) {

        return userService.searchUsers(q);
    }*/
}

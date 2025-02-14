package com.example.home_rental_app1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.home_rental_app1.dto.Login;
import com.example.home_rental_app1.dto.Register;
import com.example.home_rental_app1.jwtConfig.JwtUtill;
import com.example.home_rental_app1.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService service;

    @Autowired
    private JwtUtill jwtUtill;

    @GetMapping("/getDetails/{username}")
    public List<String> get(@PathVariable String username) {
        return service.getDetails(username);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login details) throws Exception {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(details.getUsername(), details.getPassword()));
        try {
            System.out.println("Authenticated user: " + authentication.getName()); // Debugging
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage()); // Handle exception
        }

        String token = jwtUtill.genarateToken(authentication.getName());

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(false)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 30)
                .sameSite("None")
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Login Successfully. Token : " + token + " " + cookie.toString());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Logout Successfully.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Register details) {
        service.register(details);
        return ResponseEntity.ok("Success");
    }

}

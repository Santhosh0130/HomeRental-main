package com.example.home_rental_app1.modules;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Setter
@Getter
@Document(collection = "emailOtp")
public class EmailOtpModule {

    @Id
    private String id;

    private String email;
    private String otp;
    private LocalDateTime expiryTime;

    // Constructors
    public EmailOtpModule() {}

    public EmailOtpModule(String email, String otp, LocalDateTime expiryTime) {
        this.email = email;
        this.otp = otp;
        this.expiryTime = expiryTime;
    }

    // Getters and Setters
}

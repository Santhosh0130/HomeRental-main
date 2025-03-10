package com.example.home_rental_app1.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.home_rental_app1.modules.EmailOtpModule;

public interface EmailOTPRepository extends MongoRepository<EmailOtpModule, String> {
    EmailOtpModule findByEmail(String email);
}

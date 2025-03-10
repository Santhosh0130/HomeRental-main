package com.example.home_rental_app1.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.dto.Register;
import com.example.home_rental_app1.modules.EmailOtpModule;
import com.example.home_rental_app1.modules.UserModule;
import com.example.home_rental_app1.repo.EmailOTPRepository;
import com.example.home_rental_app1.repo.UserRepo;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private EmailOTPRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    public ResponseEntity<String> register(Register details, String otp) {
        EmailOtpModule emailOTP = otpRepository.findByEmail(details.getEmail());

        if (emailOTP == null || !emailOTP.getOtp().equals(otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        if (emailOTP.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("OTP expired");
        }

        // Mark user as verified

        UserModule user = new UserModule();
        user.setEmail(details.getEmail());
        user.setUsername(details.getUsername());
        user.setPhone(details.getPhone());
        // user.setPassword(details.getPassword());
        user.setPassword(new BCryptPasswordEncoder(12).encode(details.getPassword()));
        repo.save(user);

        otpRepository.delete(emailOTP); // Remove OTP after successful verification
        return ResponseEntity.ok("Email verified successfully!");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModule users = repo.findByUsername(username);
        return new User(users.getUsername(), users.getPassword(), new ArrayList<>());
    }

    public List<String> getDetails(String username) {
        List<String> details = new ArrayList<>();
        details.add(repo.findByUsername(username).getEmail());
        details.add(repo.findByUsername(username).getUsername());
        details.add(repo.findByUsername(username).getUserId());
        details.add(repo.findByUsername(username).getPhone());
        return details;
    }

    public String generateOTP() {
        return String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit OTP
    }

    public void sendOTP(String email) throws MessagingException {
        String otp = generateOTP();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5); // OTP expires in 5 mins

        EmailOtpModule emailOTP = new EmailOtpModule(email, otp, expiryTime);
        otpRepository.save(emailOTP);

        // Send OTP via email
        String htmlContent = "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; width: 400px; margin: auto; text-align: center; border-radius: 10px'>"
                + "<h2 style='color: #333;'>Email Verification</h2>"
                + "<p style='font-size: 18px;'>Your OTP code is:</p>"
                + "<p style='font-size: 24px; font-weight: bold; color: #2d89ef;'>" + otp + "</p>"
                + "<p>Please enter this code within 5 minutes.</p>"
                + "<p style='font-size: 14px; color: #888;'>If you didn't request this, please ignore this email.</p>"
                + "</div>";

        // Create MimeMessage for HTML email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Your OTP Code");
        helper.setText(htmlContent, true); // true = send as HTML

        mailSender.send(message);
    }

    public boolean usernameIsPresent(String username) {
        UserModule user = repo.findByUsername(username);
        // System.out.println(user.getUsername()+""+username);
        return user != null && user.getUsername().equals(username) ? true : false;
    }
}

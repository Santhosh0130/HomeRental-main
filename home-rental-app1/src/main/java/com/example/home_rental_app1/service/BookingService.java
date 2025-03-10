package com.example.home_rental_app1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.modules.BookingModule;
import com.example.home_rental_app1.modules.HouseModule;
import com.example.home_rental_app1.repo.BookingRepository;
import com.example.home_rental_app1.repo.HomeRepo;

import jakarta.mail.internet.MimeMessage;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HomeRepo houseRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Get bookings for an owner
    public List<BookingModule> getOwnerBookings(String ownerId) {
        List<String> ownerHouseIds = houseRepository.findByUserId(ownerId)
                                        .stream()
                                        .map(HouseModule::getHouseId)
                                        .toList();

        return bookingRepository.findAll()
                .stream()
                .filter(booking -> ownerHouseIds.contains(booking.getHouseId()))
                .toList();
    }

    // Update booking status (Accept/Reject)
    public BookingModule updateBookingStatus(String bookingId, String status) {
        return bookingRepository.findById(bookingId).map(booking -> {
            booking.setStatus(status);
            return bookingRepository.save(booking);
        }).orElse(null);
    }


    public BookingModule createBooking(BookingModule booking) {
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public List<BookingModule> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<BookingModule> getHouseBookings(String houseId) {
        return bookingRepository.findByHouseId(houseId);
    }

    public Optional<BookingModule> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    public BookingModule updateBooking(String id, BookingModule updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setStartDate(updatedBooking.getStartDate());
            booking.setEndDate(updatedBooking.getEndDate());
            booking.setStatus(updatedBooking.getStatus());
            return bookingRepository.save(booking);
        }).orElse(null);
    }

    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }



    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("sanahomerenting@gmail.com");
        mailSender.send(message);
    }

    public void sendBookingStatusEmail(String userEmail, String houseTitle, boolean isAccepted, String location, String ownerName, String ownerEmail, String whatsappNumber) {
        String subject = isAccepted ? "🏠 Booking Accepted: " + houseTitle : "❌ Booking Denied: " + houseTitle;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(userEmail);
            helper.setSubject("Booking Status Update");

            String emailContent = "<div style='font-family:Arial, sans-serif; padding:20px; border:1px solid #ddd; border-radius:10px;'>"
                    + "<h2 style='color:#333;'>Booking Status Update</h2>"
                    + "<p>Hello,</p>"
                    + "<p>Your booking request for <b>" + houseTitle + "</b> located at <b>" + location + "</b> has been " + subject + ".</p>"
                    + "<h3>Owner Details</h3>"
                    + "<p><b>Name:</b> >" + ownerName + "</p>"
                    + "<p><b>Email:</b> <a href='mailto:" + ownerEmail + "'>" + ownerEmail + "</a></p>"
                    + "<p><b>WhatsApp:</b> <a href='https://wa.me/" + whatsappNumber + "'>" + whatsappNumber + "</a></p>"
                    + "<p>Please contact the owner for further details.</p>"
                    + "<hr style='margin-top:20px;'>"
                    + "<p style='font-size:12px; color:#666;'>This is an automated email. Please do not reply.</p>"
                    + "</div>";

            helper.setText(emailContent, true); // Send as HTML
            mailSender.send(message);

            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


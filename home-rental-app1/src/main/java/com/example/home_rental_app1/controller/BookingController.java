package com.example.home_rental_app1.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.home_rental_app1.modules.BookingModule;
import com.example.home_rental_app1.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Get all bookings for a specific owner
    @GetMapping("/owner/{ownerId}")
    public List<BookingModule> getOwnerBookings(@PathVariable String ownerId) {
        return bookingService.getOwnerBookings(ownerId);
    }

    // Accept or reject a booking request
    @PutMapping("/{id}/status")
    public BookingModule updateBookingStatus(@PathVariable String id, @RequestParam String status) {
        if (!status.equals("CONFIRMED") && !status.equals("REJECTED")) {
            throw new IllegalArgumentException("Invalid status");
        }
        return bookingService.updateBookingStatus(id, status);
    }

    // Create Booking
    @PostMapping("/addBooking")
    public BookingModule createBooking(@RequestBody BookingModule booking) {
        return bookingService.createBooking(booking);
    }

    // Get all bookings for a user
    @GetMapping("/user/{userId}")
    public List<BookingModule> getUserBookings(@PathVariable String userId) {
        return bookingService.getUserBookings(userId);
    }

    // Get all bookings for a house
    @GetMapping("/house/{houseId}")
    public List<BookingModule> getHouseBookings(@PathVariable String houseId) {
        return bookingService.getHouseBookings(houseId);
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public Optional<BookingModule> getBookingById(@PathVariable String id) {
        return bookingService.getBookingById(id);
    }

    // Update Booking (Confirm or Cancel)
    @PutMapping("/{id}")
    public BookingModule updateBooking(@PathVariable String id, @RequestBody BookingModule updatedBooking) {
        return bookingService.updateBooking(id, updatedBooking);
    }

    // Delete Booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable String id) {
        bookingService.deleteBooking(id);
    }

    @PostMapping("/sendMail")
    public void sendGmail(@RequestParam String userEmail,
            @RequestParam String houseTitle,
            @RequestParam boolean isAccepted,
            @RequestParam String location,
            @RequestParam String ownerName,
            @RequestParam String ownerEmail,
            @RequestParam String whatsappNumber) {
                bookingService.sendBookingStatusEmail(userEmail, houseTitle, isAccepted, location, ownerEmail, ownerName, whatsappNumber);

    }
}

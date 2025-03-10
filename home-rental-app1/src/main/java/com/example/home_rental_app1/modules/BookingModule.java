package com.example.home_rental_app1.modules;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@Document(collection = "bookings")
public class BookingModule {
    @Id
    private String id;
    private String userId;   // Tenant who made the booking
    private String houseId;  // House being booked
    private LocalDate startDate = LocalDate.now();
    private LocalDate endDate = LocalDate.now().plusMonths(3);
    private String status; // PENDING, CONFIRMED, REJECTED
}

package com.example.home_rental_app1.dto;

import java.sql.Date;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HouseRequest {
    private String requestId;
    private String userId;
    private String ownerId;
    private String houseId;
    private String status; // "PENDING", "APPROVED", "REJECTED"
    private Date requestDate;

    public HouseRequest(String requestId, String userId, String ownerId, String houseId) {
        this.requestId = requestId;
        this.userId = userId;
        this.ownerId = ownerId;
        this.houseId = houseId;
        this.status = "PENDING";
        this.requestDate = new Date(0);
    }
}

package com.example.home_rental_app1.dto;

import lombok.*;

@Getter
@Setter
public class SearchFilter {
    private double rent;
    private String city;
    private String district;
    private String type;
    private String furnished;
    private String parking;
    private int bhk;
}

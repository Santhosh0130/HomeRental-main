package com.example.home_rental_app1.dto;

import java.util.List;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OwnerIDS {
    private String ownerId;
    private List<HouseIDS> houses;

    // public OwnerIDS(String ownerId) {
    //     this.ownerId = ownerId;
    // }

    // public OwnerIDS(String ownerId, List<HouseIDS> houseIDS) {
    //     this.ownerId = ownerId;
    //     this.houses = houseIDS;
    // }
}

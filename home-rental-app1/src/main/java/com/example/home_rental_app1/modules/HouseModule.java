package com.example.home_rental_app1.modules;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.home_rental_app1.dto.Address;
import com.example.home_rental_app1.dto.House;
import com.example.home_rental_app1.dto.Owner;

import lombok.*;

@Getter
@Setter
@Document(collection = "houses")
public class HouseModule {

    @Id
    private String houseId;

    private String userId;
    private Owner ownerDetails;
    private Address addressDetails;
    private House houseDetails;

    // @Transient
    private List<byte[]> thumbnails;
}

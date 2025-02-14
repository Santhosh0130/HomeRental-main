package com.example.home_rental_app1.modules;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Setter
@Getter
@Document(collection = "ownerDetails")
public class OwnerModule {

    @Id
    private String ownerId;

    private String userId;
    private String name;
    private int age;
    private String address;
    private String phone;
    private String email;
}

package com.example.home_rental_app1.modules;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Setter
@Getter
@Document(collection = "carts")
public class CartModule {
    @Id
    private String userId;

    private List<String> houseId;
    // private String houseId;
}

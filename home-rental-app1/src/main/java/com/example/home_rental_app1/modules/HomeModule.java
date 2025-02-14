package com.example.home_rental_app1.modules;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Getter
@Setter
@Document(collection = "products")
public class HomeModule {
    @Id
    private String product_id;
    
    private String name;
    private String type;
    private List<Address> address;
    private double amt;
    private double sqrt;
    private boolean isFurnished;

    private boolean isAvailable;

    private List<byte[]> thumbnails;


    // private transient List<Address> address; // Processed manually
    // private transient List<byte[]> thumbnails; // Processed manually
}

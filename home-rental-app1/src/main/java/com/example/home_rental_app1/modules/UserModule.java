package com.example.home_rental_app1.modules;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Setter
@Getter
@Document(collection = "userAuth")
public class UserModule {
    @Id
    private String userId;
    
    private String username;
    private String email;
    private String password;
}

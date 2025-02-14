package com.example.home_rental_app1.repo;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.modules.UserModule;

@Repository
public interface UserRepo extends MongoRepository<UserModule, String> {
    UserModule findByUsername(String username);
    UserModule findByEmail(String email);
}

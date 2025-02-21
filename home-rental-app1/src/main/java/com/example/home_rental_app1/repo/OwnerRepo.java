package com.example.home_rental_app1.repo;

// import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.modules.OwnerModule;

@Repository
public interface OwnerRepo extends MongoRepository<OwnerModule, String> {
    Owner findByUserId(String userId);
}

package com.example.home_rental_app1.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.modules.DescriptionModule;

@Repository
public interface DescriptionRepo extends MongoRepository<DescriptionModule, String> {
    // DescriptionModule findByType(String type);
}

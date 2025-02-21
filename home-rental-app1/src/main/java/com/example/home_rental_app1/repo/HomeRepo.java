package com.example.home_rental_app1.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.modules.HouseModule;

@Repository
public interface HomeRepo extends MongoRepository<HouseModule, String> {
    List<HouseModule> findByUserId(String userId);
    List<HouseModule> findByHouseId(String houseId);
}

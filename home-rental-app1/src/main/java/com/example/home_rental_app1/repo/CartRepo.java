package com.example.home_rental_app1.repo;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.dto.Cart;
import com.example.home_rental_app1.modules.CartModule;

@Repository
public interface CartRepo extends MongoRepository<CartModule, String> {
    Cart findByUserId(String userId);

    
    // List<String> findByItemsUserId(String userId);
    // CartModule findByUserId(String userId);

    // @Query("{ 'userId' : ?0 }")
    // @Update("{ '$push': { 'houseId': ?1 } }")
    // void addHouseIdToUserId(String userId, String houseId);

    // @Query("{ 'userId' : ?0 }")
    // @Update("{ '$pull' : { 'houseId' : ?1 } }")
    // void removeHouseIdFromUserId(String userId, String houseId);
}
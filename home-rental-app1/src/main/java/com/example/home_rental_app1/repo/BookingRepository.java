package com.example.home_rental_app1.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.home_rental_app1.modules.BookingModule;


@Repository
public interface BookingRepository extends MongoRepository<BookingModule, String> {
    List<BookingModule> findByHouseId(String houseId);

    List<BookingModule> findByUserId(String userId);
}


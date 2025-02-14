package com.example.home_rental_app1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.modules.OwnerModule;
import com.example.home_rental_app1.repo.OwnerRepo;
import com.example.home_rental_app1.repo.UserRepo;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepo repo;

    @Autowired
    private UserRepo userRepo;

    public void addOwner(Owner details){
        OwnerModule user = new OwnerModule();
        user.setName(details.getName());
        user.setAddress(details.getAddress());
        user.setAge(details.getAge());
        user.setEmail(details.getEmail());
        user.setPhone(details.getPhone());
        user.setUserId(details.getUserId());

        repo.save(user);
    }

    public List<Owner> getOwner(String username) {
        String userId = userRepo.findByUsername(username).getUserId();
        return repo.findByUserId(userId);
    }
}

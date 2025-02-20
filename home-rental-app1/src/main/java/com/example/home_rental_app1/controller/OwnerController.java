package com.example.home_rental_app1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.service.OwnerService;

@RequestMapping("/owner")
@RestController
public class OwnerController {

    @Autowired
    private OwnerService service;

    @PostMapping("/addOwner")
    private ResponseEntity<String> addOwner(@RequestBody Owner details) {
        service.addOwner(details);
        return ResponseEntity.ok("Addedd");
    }

    @GetMapping("/getOwner/{username}")
    private ResponseEntity<List<Owner>> getOwnerDetails(@PathVariable String username) {
        // System.out.println(service.getOwner(username));
        return ResponseEntity.ok(service.getOwner(username));
    }
}

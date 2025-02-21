package com.example.home_rental_app1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/addOwner/{userId}")
    private ResponseEntity<String> addOwner(@RequestBody Owner details, @PathVariable String userId) {
        service.addOwner(details, userId);
        return ResponseEntity.ok("Addedd");
    }

    @GetMapping("/getOwner/{userId}")
    private ResponseEntity<List<Owner>> getOwnerDtails(@PathVariable String userId) {
        return ResponseEntity.ok(service.getOwner(userId));
    }

    @PutMapping("/updateOwner/{userId}")
    private ResponseEntity<String> updateItem(@RequestBody Owner details, @PathVariable String userId) {
        service.updateItem(details, userId);
        return ResponseEntity.ok("Updated.");
    }

    @DeleteMapping("/removeOwner/{userId}")
    private ResponseEntity<String> removeItem(@RequestBody Owner details, @PathVariable String userId) {
        service.removeItem(details, userId);
        return ResponseEntity.ok("Removed.");
    }
}

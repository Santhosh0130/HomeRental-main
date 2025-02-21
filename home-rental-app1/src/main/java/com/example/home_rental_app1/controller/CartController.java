package com.example.home_rental_app1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.home_rental_app1.dto.Cart;
import com.example.home_rental_app1.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService service;

    // @GetMapping("/getItems/{userId}")
    // private List<String> getCartItems (@PathVariable String userId) {
    //     return service.getAllItems(userId);
    // }

    // @PostMapping("/addItem")
    // private void addItem (@RequestBody Cart details) {
    //     service.addItem(details.getUserId(), details.getHouseId());
    // }

    // @PostMapping("/removeItem")
    // private void removeItem (@RequestBody Cart details) {
    //     service.removeItem(details.getUserId(), details.getHouseId());
    // }

    
    // Get cart details
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        Cart cart = service.getCartByUserId(userId);
        if (cart != null) {
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.notFound().build();
    }

    // Add house to cart
    @PostMapping("/{userId}/add")
    public ResponseEntity<String> addHouseToCart(@PathVariable String userId, @RequestParam String houseId) {
        boolean updated = service.addHouseToCart(userId, houseId);
        if (updated) {
            return ResponseEntity.ok("House added to cart successfully.");
        }
        return ResponseEntity.badRequest().body("Failed to add house.");
    }

    // Remove house from cart
    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<String> removeHouseFromCart(@PathVariable String userId, @RequestParam String houseId) {
        boolean updated = service.removeHouseFromCart(userId, houseId);
        if (updated) {
            return ResponseEntity.ok("House removed from cart successfully.");
        }
        return ResponseEntity.badRequest().body("Failed to remove house.");
    }
}

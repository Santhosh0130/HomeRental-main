package com.example.home_rental_app1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.dto.Cart;
import com.example.home_rental_app1.modules.CartModule;
import com.example.home_rental_app1.repo.CartRepo;
// import com.example.home_rental_app1.repo.HomeRepo;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private MongoTemplate template;

    // public List<String> getAllItems(String userId) {
    //     // return cartRepo.findByItemsUserId(userId);
    //     return null;
    // }

    // // public void addItem(CartModule details) {
    // //     if (cartRepo.findByUserId(details.getUserId()) != null) {
    // //         CartModule newItem = cartRepo.findByUserId(details.getUserId());
    // //         newItem.setUserId(details.getUserId());
    // //         newItem.setHouseId(details.getHouseId());

    // //         cartRepo.save(newItem);
    // //     } else {
    // //         cartRepo.save(details);
    // //     }
    // // }
    // public void addItem(String userId, String houseId) {
    //     System.out.println("Adding the house to the user, "+cartRepo.findById(userId));
    //     // cartRepo.addHouseIdToUserId(userId, houseId);
    //     // Query query = new Query(Criteria.where("userId").is(userId));
    //     // Update update = new Update().push("houseId", query);
    //     // template.updateFirst(query, update, "carts");
    //     List<String> houseIds = new ArrayList<>();
    //     houseIds.add(houseId);
    //     CartModule cart = new CartModule();
    //     cart.setHouseId(houseIds);
    //     cart.setUserId(userId);

    //     cartRepo.save(cart);
    // }

    // public void removeItem(String userId, String houseId) {
    //     // cartRepo.removeHouseIdFromUserId(userId, houseId);
    // }


    // Get user's cart
    public Cart getCartByUserId(String userId) {
        return cartRepo.findByUserId(userId);
    }

    // Add a houseId to the user's cart
    public boolean addHouseToCart(String userId, String houseId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().push("houseId", houseId);
        var result = template.upsert(query, update, CartModule.class);
        return result.getModifiedCount() > 0;
    }

    // Remove a houseId from the user's cart
    public boolean removeHouseFromCart(String userId, String houseId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().pull("houseId", houseId);
        var result = template.updateFirst(query, update, CartModule.class);
        return result.getModifiedCount() > 0;
    }
}

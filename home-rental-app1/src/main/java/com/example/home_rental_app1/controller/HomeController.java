package com.example.home_rental_app1.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.modules.Address;
import com.example.home_rental_app1.modules.HouseModule;
import com.example.home_rental_app1.service.HomeService;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class HomeController {
    
    @Autowired
    private HomeService service;

    @GetMapping("/all")
    private List<HouseModule> getAll() {
        return service.getAll();
    }

    @GetMapping("/product/{id}")
    private HouseModule getById(@PathVariable String id) {
        return service.getById(id);
    }

    // @PutMapping("/updateFav/{id}/{value}")
    // private HomeModule updateFav(@PathVariable String id, @PathVariable boolean
    // value) {
    // return service.updateFav(id, value);
    // }

    // @PostMapping("/add")
    // public ResponseEntity<HomeModule> createProduct(
    //         @RequestPart("HomeModule") HomeModule product,
    //         @RequestPart("thumbnails") List<MultipartFile> thumbnails) throws IOException {

    //     // Convert MultipartFiles to byte[] and set them in the product
    //     List<byte[]> imageThumbnails = new ArrayList<>();
    //     for (MultipartFile file : thumbnails) {
    //         imageThumbnails.add(file.getBytes());
    //     }
    //     product.setThumbnails(imageThumbnails);

    //     service.addProduct(product);

    //     return ResponseEntity.status(200).body(product);
    // }

    @PostMapping("/addHouse")
    public ResponseEntity<String> addHouse(
        @RequestPart("Owner") Owner owner,
        @RequestPart("Address") Address address,
        @RequestPart("thumbnails") List<MultipartFile> thumbnails) throws IOException {

            List<byte[]> imageThumbnails = new ArrayList<>();
            for (MultipartFile file : thumbnails) {
                imageThumbnails.add(file.getBytes());
            }
            HouseModule house = new HouseModule();
            house.setAddressDetails(address);
            house.setOwnerDetails(owner);
            house.setThumbnails(imageThumbnails);

            service.addProduct(house);

            return ResponseEntity.ok("Added");
        }

    @GetMapping("/{id}/thumbnails/{index}")
    public ResponseEntity<byte[]> getThumbnails(@PathVariable String id, @PathVariable int index) {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(service.getThumnails(id, index));
    }
}

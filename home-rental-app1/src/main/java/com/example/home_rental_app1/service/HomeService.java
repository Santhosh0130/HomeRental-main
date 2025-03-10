package com.example.home_rental_app1.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.home_rental_app1.dto.Address;
import com.example.home_rental_app1.dto.House;
import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.dto.SearchFilter;
import com.example.home_rental_app1.modules.DescriptionModule;
import com.example.home_rental_app1.modules.HouseModule;
import com.example.home_rental_app1.repo.DescriptionRepo;
import com.example.home_rental_app1.repo.HomeRepo;

@Service
public class HomeService {

    @Autowired
    private HomeRepo repo;

    @Autowired
    private DescriptionRepo descriptionRepo;

    @Autowired
    private MongoTemplate template;

    @Autowired
    private Cloudinary cloudinary;

    // public List<HomeModule> getAll(){
    // return repo.findAll();
    // }

    // public HomeModule getById(String id){
    // return repo.findById(id).orElse(null);
    // }

    // public HomeModule addProduct(HouseModule house) throws IOException {
    // return repo.save(house);
    // }

    public void addItem(String userId, Owner owner, Address address, House house, List<MultipartFile> thumbnails)
            throws IOException, java.io.IOException {

        itemHandle(userId, owner, address, house, thumbnails, null);
    }

    public void updateItem(String userId, Owner owner, Address address, House house, List<MultipartFile> thumbnails, String houseId)
            throws java.io.IOException {

        itemHandle(userId, owner, address, house, thumbnails, houseId);
    }

    private void itemHandle(String userId, Owner owner, Address address, House house, List<MultipartFile> thumbnails, String houseId)
            throws java.io.IOException {
        List<String> imageThumbnails = new ArrayList<>();
        HouseModule houseDetails;

        for (MultipartFile file : thumbnails) {
            // imageThumbnails.add(file.getBytes());
            imageThumbnails.add(uploadCompressedImage(file));
        }
        if(houseId != null) {
            houseDetails = getByHouseId(houseId);
        } else {
            houseDetails = new HouseModule();
        }
        houseDetails.setUserId(userId);
        houseDetails.setAddressDetails(address);
        houseDetails.setOwnerDetails(owner);
        houseDetails.setThumbnails(imageThumbnails);

        house.setDescription(getDescription(house.getType()));
        houseDetails.setHouseDetails(house);

        repo.save(houseDetails);
    }

    public void deleteItem(String houseId) {
        template.remove(new Query(Criteria.where("_id").is(houseId)), "houses");
    }

    public String getDescription(String type) {
        Random random = new Random();
        DescriptionModule des = descriptionRepo.findAll().get(0);
        switch (type) {
            case "villa":
                return des.getVilla().get(random.nextInt(5)).getDescription();

            case "apartment":
                return des.getApartment().get(random.nextInt(5)).getDescription();

            case "independent":
                return des.getIndependent().get(random.nextInt(5)).getDescription();

        }
        return null;
    }

    public List<HouseModule> getAll() {
        return repo.findAll();
    }

    public HouseModule getByHouseId(String id) {
        return repo.findById(id).orElse(null);
    }

    public List<HouseModule> getByUserId(String userId) {
        return repo.findByUserId(userId);
    }

    public List<HouseModule> getFilteredItems(SearchFilter details) {
        Query query = new Query();
        if (details.getRent() != 0) {
            query.addCriteria(Criteria.where("houseDetails.rent").lte(details.getRent()));
        }
        if (details.getBhk() != 0) {
            query.addCriteria(Criteria.where("houseDetails.bhk").is(details.getBhk()));
        }
        if (details.getArea() != null && !details.getArea().isEmpty()) {
            query.addCriteria(Criteria.where("addressDetails.area").regex(details.getArea(), "i"));
        }
        if (details.getCity() != null && !details.getCity().isEmpty()) {
            query.addCriteria(Criteria.where("addressDetails.city").regex(details.getCity(), "i"));
        }
        if (details.getParking() != null && !details.getParking().isEmpty()) {
            query.addCriteria(Criteria.where("houseDetails.parking").is(details.getParking()));
        }
        if (details.getType() != null && !details.getType().isEmpty()) {
            query.addCriteria(Criteria.where("houseDetails.type").is(details.getType()));
        }
        // System.out.println("Query is: " + query.toString());
        // System.out.println("After filter, " + template.find(query, HouseModule.class));
        return template.find(query, HouseModule.class);
    }

    public String uploadCompressedImage(MultipartFile imageFile) throws IOException {
        String imageUrl;
        Map uploadImage;
        try {
            uploadImage = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.asMap(
                "resource_type", "image",  // Corrected typo here
                "quality", "auto:low",
                "format", "jpg"
            ));
            imageUrl = uploadImage.get("url").toString();
        } catch(IOException e) {
            throw new RuntimeException("Failed to upload an image", e);
        }
        return imageUrl;
    }

    public int getViewCount(String houseId) {
        return repo.findById(houseId).map(HouseModule::getViewCount) // Get view count if present
        .orElse(0);
    }

    public void incrementViews(String houseId) {
        repo.findById(houseId).ifPresent(house -> {
            house.setViewCount(house.getViewCount() + 1);
            repo.save(house);
        });
    }

}

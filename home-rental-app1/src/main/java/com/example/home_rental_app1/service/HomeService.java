package com.example.home_rental_app1.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.NotFound;
import org.springframework.web.multipart.MultipartFile;

import com.example.home_rental_app1.dto.Address;
import com.example.home_rental_app1.dto.House;
import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.dto.SearchFilter;
import com.example.home_rental_app1.modules.DescriptionModule;
import com.example.home_rental_app1.modules.HouseModule;
import com.example.home_rental_app1.repo.DescriptionRepo;
import com.example.home_rental_app1.repo.HomeRepo;

import io.jsonwebtoken.io.IOException;

@Service
public class HomeService {

    @Autowired
    private HomeRepo repo;

    @Autowired
    private DescriptionRepo descriptionRepo;

    @Autowired
    private MongoTemplate template;

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
        List<byte[]> imageThumbnails = new ArrayList<>();
        HouseModule houseDetails;

        for (MultipartFile file : thumbnails) {
            imageThumbnails.add(file.getBytes());
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

    // public HomeModule updateFav(String id, boolean status){
    // HomeModule updatedFav = getById(id);
    // updatedFav.setFavourites(status);
    // return repo.save(updatedFav);
    // }

    public byte[] getThumnails(String id, int index) throws NotFound {
        byte[] thumbnail = getByHouseId(id).getThumbnails().get(index);
        if (thumbnail != null) {
            return getByHouseId(id).getThumbnails().get(index);
        } else {
            return null;
        }
    }

    public List<HouseModule> getItems(SearchFilter details) {
        // System.out.println("Filter Type, " + details.getType() + " " + details.getRent());
        Query query = new Query();
        if (details.getRent() != 0) {
            query.addCriteria(Criteria.where("houseDetails.rent").lte(details.getRent()));
        }
        if (details.getBhk() != 0) {
            query.addCriteria(Criteria.where("houseDetails.bhk").is(details.getBhk()));
        }
        if (details.getCity() != null && !details.getCity().isEmpty()) {
            query.addCriteria(Criteria.where("addressDetails.city").is(details.getCity()));
        }
        if (details.getDistrict() != null && !details.getDistrict().isEmpty()) {
            query.addCriteria(Criteria.where("addressDetails.district").is(details.getDistrict()));
        }
        if (details.getFurnished() != null && !details.getFurnished().isEmpty()) {
            query.addCriteria(Criteria.where("houseDetails.furnished").is(details.getFurnished()));
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

}

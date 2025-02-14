package com.example.home_rental_app1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.NotFound;

import com.example.home_rental_app1.modules.HouseModule;
import com.example.home_rental_app1.repo.HomeRepo;

import io.jsonwebtoken.io.IOException;

@Service
public class HomeService {
    @Autowired
    private HomeRepo repo;

    // public List<HomeModule> getAll(){
    //     return repo.findAll();
    // }

    // public HomeModule getById(String id){
    //     return repo.findById(id).orElse(null);
    // }

    // public HomeModule addProduct(HouseModule house) throws IOException {
    //     return repo.save(house);
    // }

    public HouseModule addProduct(HouseModule house) throws IOException {
        return repo.save(house);
    }


    public List<HouseModule> getAll(){
        return repo.findAll();
    }

    public HouseModule getById(String id){
        return repo.findById(id).orElse(null);
    }

    // public HomeModule updateFav(String id, boolean status){
    //     HomeModule updatedFav = getById(id);
    //     updatedFav.setFavourites(status);
    //     return repo.save(updatedFav);
    // }

    public byte[] getThumnails(String id, int index) throws NotFound {
        byte[] thumbnail = getById(id).getThumbnails().get(index);
        if (thumbnail != null){
            return getById(id).getThumbnails().get(index);
        } else {
            return null;
        }
    }

    // public List<HomeModule> getAllFav(){
    //     return
    // }
}

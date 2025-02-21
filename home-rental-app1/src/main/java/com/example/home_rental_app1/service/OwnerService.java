package com.example.home_rental_app1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.dto.Owner;
import com.example.home_rental_app1.modules.OwnerModule;
import com.example.home_rental_app1.repo.OwnerRepo;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepo repo;

    @Autowired
    private MongoTemplate template;

    public void addOwner(Owner details, String userId){
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().push("details", details);
        template.upsert(query, update, OwnerModule.class);
    }

    public void updateItem(Owner details, String userId) {
        Query query = new Query(Criteria.where("userId").is(userId).and("details.phone").is(details.getPhone()));
        Update update = new Update()
            .set("details.$.name", details.getName())
            .set("details.$.age", details.getAge())
            .set("details.$.phone", details.getPhone())
            .set("details.$.email", details.getEmail())
            .set("details.$.address", details.getAddress());
        template.updateFirst(query, update, OwnerModule.class);
    }

    public List<Owner> getOwner(String userId) {
        Optional<OwnerModule> data = repo.findById(userId);
        return data.get().getDetails();
    }

    public void removeItem(Owner details, String userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().pull("details", details);
        template.updateFirst(query, update, OwnerModule.class);
    }

}

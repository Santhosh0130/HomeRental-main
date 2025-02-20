package com.example.home_rental_app1.modules;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.home_rental_app1.dto.Descriptions;

import lombok.*;

@Getter
@Setter
@Document(collection = "autoGen")
public class DescriptionModule {
    @Id
    private String descriptionId;
    
    private List<Descriptions> villa;
    private List<Descriptions> apartment;
    private List<Descriptions> independent;
}

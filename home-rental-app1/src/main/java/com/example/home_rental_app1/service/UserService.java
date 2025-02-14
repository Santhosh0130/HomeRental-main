package com.example.home_rental_app1.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.home_rental_app1.dto.Register;
import com.example.home_rental_app1.modules.UserModule;
import com.example.home_rental_app1.repo.UserRepo;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepo repo;

    // @Autowired
    // private UserModule user;

    public void register(Register details){
        UserModule user = new UserModule();
        user.setEmail(details.getEmail());
        user.setUsername(details.getUsername());
        // user.setPassword(details.getPassword());
        user.setPassword(new BCryptPasswordEncoder(12).encode(details.getPassword()));
        repo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModule users = repo.findByUsername(username);
       return new User(users.getUsername(), users.getPassword(), new ArrayList<>());
    }

    public List<String> getDetails(String username) {
        List<String> details = new ArrayList<>();
        details.add(repo.findByUsername(username).getEmail());
        details.add(repo.findByUsername(username).getUsername());
        details.add(repo.findByUsername(username).getUserId());
        return details;
    }
}

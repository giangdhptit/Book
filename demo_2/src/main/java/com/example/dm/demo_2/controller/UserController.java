package com.example.dm.demo_2.controller;

import com.example.dm.demo_2.model.User;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.repository.UserRepository;
import com.example.dm.demo_2.request.LoginRequest;
import com.example.dm.demo_2.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "")
public class UserController {
    @Autowired
    private UserServiceImpl UserServiceImpl;

    @CrossOrigin
    @PostMapping(value = "/login")
    ResponseEntity<ResObject> checkLogin(@RequestBody LoginRequest req){
        return UserServiceImpl.checkLogin(req);
    }

    @GetMapping("/users/getAllUsers")
    List<User> getAllUsers(){
        return UserServiceImpl.getAllUsers();
    }

    @GetMapping("/users/{user_id}")
    ResponseEntity<ResObject> getUser(int user_id){
        return UserServiceImpl.getUser(user_id);
    }

    @PostMapping("/users/add")
    ResponseEntity<ResObject> addUser(@RequestBody User newUser){
        return UserServiceImpl.addUser(newUser);
    }

    @PutMapping("/users/{user_id}/update")
    ResponseEntity<ResObject> updateUser(int user_id, User user){
        return UserServiceImpl.updateUser(user_id,user);
    }

}

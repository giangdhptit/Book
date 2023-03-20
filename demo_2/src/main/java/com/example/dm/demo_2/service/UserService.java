package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.User;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.request.LoginRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    ResponseEntity<ResObject> getUser(int User_id);
    ResponseEntity<ResObject> addUser(User user);
    ResponseEntity<ResObject> updateUser(int User_id, User user);
    ResponseEntity<ResObject> checkLogin(LoginRequest req);
}

package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.User;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.repository.UserRepository;
import com.example.dm.demo_2.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository UserRepository;

    @Override
    public List<User> getAllUsers() {
        List<User> UserList = UserRepository.findAll();
        return UserList;
    }

    @Override
    public ResponseEntity<ResObject> getUser(int User_id) {
        Optional<User> foundUser = UserRepository.findById(User_id);
        if (foundUser.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundUser)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+User_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> addUser(User user) {
        User foundUser = UserRepository.findByUsername(user.getUsername().trim());
        if (foundUser!=null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","User already existed","")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded",UserRepository.save(user))
        );
    }


    @Override
    public ResponseEntity<ResObject> updateUser(int user_id, User user) {
        Optional<User> foundUser = UserRepository.findById(user_id);
        if (foundUser!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",UserRepository.save(user))
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+user_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> checkLogin(LoginRequest req) {

        User foundUser = UserRepository.findByUsername(req.getUsername());

        if ((foundUser==null) || (!foundUser.getPassword().equals(req.getPassword()))){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Username or password might be incorrect","")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded",foundUser));
    }

}

package com.example.dm.demo_2.controller;

import com.example.dm.demo_2.config.FileUploadUtil;
import com.example.dm.demo_2.model.Bill;
import com.example.dm.demo_2.model.Book;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.model.User;
import com.example.dm.demo_2.response.AddBookResponse;
import com.example.dm.demo_2.service.BillServiceImpl;
import com.example.dm.demo_2.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "/Bills")
public class BillController {
    @Autowired
    private BillServiceImpl billServiceImpl;

//    @Autowired
//    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";
//
    @GetMapping("/{user_id}")
    List<Bill> getAllBills(@PathVariable String user_id){
        return billServiceImpl.getAllBills(user_id);
    }
//
//    @GetMapping("/{Book_id}")
//    ResponseEntity<ResObject> getBook(@PathVariable int Book_id){
//        return BookServiceImpl.getBook(Book_id);
//    }

    @PostMapping("/add")
    ResponseEntity<ResObject> addBills(@RequestBody Bill newBill)  {
        AddBookResponse res = new AddBookResponse();
        Bill bill = new Bill();
        bill.setUser_id(newBill.getUser_id());
        bill.setBook_id(newBill.getBook_id());
        bill.setCode(newBill.getCode());
        bill.setAddress(newBill.getAddress());
        bill.setPhone(newBill.getPhone());
        bill.setQuantity(newBill.getQuantity());
        return billServiceImpl.saveBill(bill);
    }

    @DeleteMapping("/{id}/delete")
    ResponseEntity<ResObject> deleteBill(@PathVariable int id){
        return  billServiceImpl.deleteBill(id);
    }
}

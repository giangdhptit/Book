package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.Bill;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.request.SaveBillRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BillService {
    List<Bill> getAllBills(String uid);
    ResponseEntity<ResObject> getBill(int Bill_id);
    ResponseEntity<ResObject> saveBill(Bill Bill);

    ResponseEntity<ResObject> deleteBill(int Bill_id);
}

package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.Bill;
import com.example.dm.demo_2.model.Bill;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.repository.BillRepository;
import com.example.dm.demo_2.request.SaveBillRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    BillRepository BillRepository;

    @Override
    public List<Bill> getAllBills(String uid) {
        List<Bill> foundBill = BillRepository.findByUser_id(uid);
        return foundBill;
    }

    @Override
    public ResponseEntity<ResObject> getBill(int Bill_id) {
        Optional<Bill> foundBill = BillRepository.findById(Bill_id);
        if (foundBill.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundBill)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+Bill_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> saveBill(Bill bill) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", BillRepository.save(bill))
        );
    }




    @Override
    public ResponseEntity<ResObject> deleteBill(int Bill_id) {
        Optional<Bill> foundBill = BillRepository.findById(Bill_id);
        if (foundBill.isPresent()){
            BillRepository.deleteById(Bill_id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded","")
            );

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("failed", "failed", "")
            );
        }
    }
}

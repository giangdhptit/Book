package com.example.dm.demo_2.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveBillRequest {
    private String user_id;
    private String book_id;
    private String quantity;
    private String code;
    private String address;
    private String phone;
}

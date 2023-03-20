package com.example.dm.demo_2.model;

import javax.persistence.*;
import java.io.Serializable;


@Entity(name="Bill")
@Table(name="bills")
public class Bill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private String user_id;

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Column(name="book_id")
    private String book_id;

    @Column(name="quantity")
    private String quantity;

    @Column(name="code")
    private String code;

    @Column(name="address")
    private String address;

    @Column(name="phone")
    private String phone;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Bill(int id, String user_id, String book_id, String code) {
        this.id = id;
        this.user_id = user_id;
        this.book_id = book_id;
        this.code = code;

    }

    public Bill() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getBook_id() {
        return book_id;
    }

    public void setBook_id(String book_id) {
        this.book_id = book_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }


}

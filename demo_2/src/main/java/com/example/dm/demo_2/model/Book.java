package com.example.dm.demo_2.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDate;


@Entity(name="Book")
@Table(name="books")
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="publishing_day")
    private String publishing_day;

    @Column(name="pages")
    private int pages;

    @Column(name="type")
    private String type;

    @Column(name="description")
    private String description;




    public byte[] getPhoto_data() {
        return photo_data;
    }

    public void setPhoto_data(byte[] photo_data) {
        this.photo_data = photo_data;
    }

    public String getPhoto_name() {
        return photo_name;
    }

    public void setPhoto_name(String photo_name) {
        this.photo_name = photo_name;
    }

    public String getPhoto_type() {
        return photo_type;
    }

    public void setPhoto_type(String photo_type) {
        this.photo_type = photo_type;
    }

    @Column(name="photo_data")
    private byte[] photo_data;

    @Column(name="photo_name")
    private String photo_name;

    @Column(name="photo_type")
    private String photo_type;



    public Book(){

    }

    public Book(int id, String title, String author, String publishing_day, int pages, String type, String description, byte[] photo_data, String photo_name,String photo_type) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishing_day = publishing_day;
        this.pages = pages;
        this.type = type;
        this.description = description;

        this.photo_data = photo_data;
        this.photo_name = photo_name;
        this.photo_type = photo_type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublishing_day() {
        return publishing_day;
    }

    public void setPublishing_day(String publishing_day) {
        this.publishing_day = publishing_day;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

package com.example.dm.demo_2.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveBookRequest {
    private String title;
    private String author;
    private String publishing_day;
    private int pages;
    private String type;
    private String description;
    private String photo;
}

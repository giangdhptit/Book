package com.example.dm.demo_2.repository;


import com.example.dm.demo_2.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    //List<Auction> findByName(String name);
}

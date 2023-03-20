package com.example.dm.demo_2.repository;


import com.example.dm.demo_2.model.Bill;
import com.example.dm.demo_2.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query(value="SELECT * FROM Bills WHERE Bills.user_id = user_id",nativeQuery = true)
    List<Bill> findByUser_id(@Param("user_id") String uid);
}

package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.Book;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.request.SaveBookRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    ResponseEntity<ResObject> getBook(int Book_id);
    ResponseEntity<ResObject> saveBook(Book Book);
    ResponseEntity<ResObject> updateBook(int Book_id, SaveBookRequest Book);
    ResponseEntity<ResObject> deleteBook(int Book_id);
}

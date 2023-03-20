package com.example.dm.demo_2.service;

import com.example.dm.demo_2.model.Book;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.repository.BookRepository;
import com.example.dm.demo_2.request.SaveBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository BookRepository;

    @Override
    public List<Book> getAllBooks() {
        List<Book> BookList = BookRepository.findAll();
        return BookList;
    }

    @Override
    public ResponseEntity<ResObject> getBook(int Book_id) {
        Optional<Book> foundBook = BookRepository.findById(Book_id);
        if (foundBook.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundBook)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+Book_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> saveBook(Book Book) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", BookRepository.save(Book))
        );
    }


    @Override
    public ResponseEntity<ResObject> updateBook(int Book_id, SaveBookRequest req) {
        DateFormat dateFormatYMD = new SimpleDateFormat("MM/dd/yyyy");
//        System.out.println("req"+req.getPublishing_day());
//       String pd = dateFormatYMD.format(req.getPublishing_day());
//       System.out.println("pd"+pd);

        Book newBook = new Book();
        newBook.setId(Book_id);
        newBook.setTitle(req.getTitle());
        newBook.setAuthor(req.getAuthor());
        newBook.setPublishing_day((req.getPublishing_day()));

        newBook.setPages(req.getPages());
        newBook.setType(req.getType());
        newBook.setDescription(req.getDescription());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded", BookRepository.save(newBook))
            );
    }

    @Override
    public ResponseEntity<ResObject> deleteBook(int Book_id) {
        Optional<Book> foundBook = BookRepository.findById(Book_id);
        if (foundBook.isPresent()){
            BookRepository.deleteById(Book_id);
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

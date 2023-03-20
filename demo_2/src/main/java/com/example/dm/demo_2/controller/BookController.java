package com.example.dm.demo_2.controller;

import com.example.dm.demo_2.config.FileUploadUtil;
import com.example.dm.demo_2.model.Book;
import com.example.dm.demo_2.model.ResObject;
import com.example.dm.demo_2.request.SaveBookRequest;
import com.example.dm.demo_2.response.AddBookResponse;
import com.example.dm.demo_2.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.FileCopyUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.time.LocalDate;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "/Books")
public class BookController {
    @Autowired
    private BookServiceImpl BookServiceImpl;

    @Autowired
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";

    @GetMapping("")
    List<Book> getAllBooks(){
        return BookServiceImpl.getAllBooks();
    }

    @GetMapping("/{Book_id}")
    ResponseEntity<ResObject> getBook(@PathVariable int Book_id){
        return BookServiceImpl.getBook(Book_id);
    }

    @PostMapping("/add")
    ResponseEntity<ResObject> addBook(@RequestParam("photo") MultipartFile file,@RequestParam String title, @RequestParam String description, @RequestParam String author,@RequestParam String publishing_day, @RequestParam String type, @RequestParam int pages ) throws IOException {
        AddBookResponse res = new AddBookResponse();
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPages(pages);
        book.setPublishing_day(publishing_day);
        book.setDescription((description));
        book.setType(type);
        book.setPhoto_name(StringUtils.cleanPath(file.getOriginalFilename()));
        book.setPhoto_type(file.getContentType());
        book.setPhoto_data(file.getBytes());
        String uploadDir = EXTERNAL_FILE_PATH + book.getId();
        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
        return BookServiceImpl.saveBook(book);
    }
    @RequestMapping(value="/{id}/{fileName:.+}",produces = MediaType.IMAGE_PNG_VALUE)
    public void downloadPDFResource(HttpServletResponse response,
                                    @PathVariable("fileName") String fileName, @PathVariable("id") String id) throws IOException {
        File file = new File(EXTERNAL_FILE_PATH+id+"/" + fileName);
        if (file.exists()) {
            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
            response.setContentLength((int) file.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(inputStream, response.getOutputStream());

        }
    }
    @PutMapping("/{id}/update")
    ResponseEntity<ResObject> updateBook(@RequestParam("photo") MultipartFile file,@PathVariable int id,@RequestParam String title, @RequestParam String description, @RequestParam String author,@RequestParam String publishing_day, @RequestParam String type, @RequestParam int pages ) throws IOException {
        AddBookResponse res = new AddBookResponse();
        Book book = new Book();
        book.setId(id);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPages(pages);
        book.setPublishing_day(publishing_day);
        book.setDescription((description));
        book.setType(type);
        book.setPhoto_name(StringUtils.cleanPath(file.getOriginalFilename()));
        book.setPhoto_type(file.getContentType());
        book.setPhoto_data(file.getBytes());
        String uploadDir = EXTERNAL_FILE_PATH + book.getId();
        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
        return BookServiceImpl.saveBook(book);
    }

    @DeleteMapping("/{id}/delete")
    ResponseEntity<ResObject> deleteBook(@PathVariable int id){
        return  BookServiceImpl.deleteBook(id);
    }
}

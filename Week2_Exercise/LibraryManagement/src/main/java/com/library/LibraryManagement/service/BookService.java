package com.library.LibraryManagement.service;
import com.library.LibraryManagement.repository.BookRepository;
public class BookService {

    private BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void showBook() {
        System.out.println("Book Service is running...");
        bookRepository.displayBook();
    }

}

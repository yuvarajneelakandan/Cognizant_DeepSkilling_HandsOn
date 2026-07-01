package com.library.LibraryManagement;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.ApplicationContext;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.library.LibraryManagement.service.*;


@SpringBootApplication
public class LibraryManagementApplication {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        BookService service = context.getBean("bookService", BookService.class);

        service.showBook();

        ((ClassPathXmlApplicationContext) context).close();
    }

}

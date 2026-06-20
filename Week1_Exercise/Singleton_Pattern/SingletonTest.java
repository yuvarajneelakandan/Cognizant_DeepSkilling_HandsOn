package Singleton_Pattern;

public class SingletonTest {

    public static void main(String[] args) {

        // Accessing the Logger instance for the first time
        Logger logger1 = Logger.getInstance();
        logger1.log("Application started.");

        // Accessing the Logger instance again
        Logger logger2 = Logger.getInstance();
        logger2.log("User logged in.");

        // Checking whether both references point to the same object
        if (logger1 == logger2) {
            System.out.println("Only one Logger instance exists.");
        } else {
            System.out.println("Multiple Logger instances exist.");
        }

        // Displaying hash codes 
        System.out.println("Logger 1 Hash Code: " + logger1.hashCode());
        System.out.println("Logger 2 Hash Code: " + logger2.hashCode());
    }
}
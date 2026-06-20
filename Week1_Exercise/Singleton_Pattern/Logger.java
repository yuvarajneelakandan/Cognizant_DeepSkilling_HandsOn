package Singleton_Pattern;

public class Logger {

    // Creating the single instance when the class is loaded
    private static Logger instance = new Logger();

    //  Prevents object creation from other classes
    private Logger() {
        System.out.println("Logger instance created.");
    }

   
    public static Logger getInstance() {
        return instance;
    }

   
    public void log(String message) {
        System.out.println("[LOG]: " + message);
    }
}
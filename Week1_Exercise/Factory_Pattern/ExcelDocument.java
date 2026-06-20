package Factory_Pattern;

public class ExcelDocument implements Document {

    @Override
    public void open() {
        System.out.println("Opening Excel document...");
    }
}
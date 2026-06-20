package SearchAlgorithm;


import java.util.Arrays;
import java.util.Comparator;

public class SearchTest {

    // Linear Search
    public static Product linearSearch(Product[] products, int targetId) {

        for (Product product : products) {
            if (product.getProductId() == targetId) {
                return product;
            }
        }

        return null;
    }

    // Binary Search
    public static Product binarySearch(Product[] products, int targetId) {

        int left = 0;
        int right = products.length - 1;

        while (left <= right) {

            int mid = left + (right - left) / 2;

            if (products[mid].getProductId() == targetId) {
                return products[mid];
            }

            if (products[mid].getProductId() < targetId) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
            new Product(104, "Laptop", "Electronics"),
            new Product(101, "Headphones", "Electronics"),
            new Product(105, "Notebook", "Stationery"),
            new Product(102, "Keyboard", "Electronics"),
            new Product(103, "Water Bottle", "Home")
        };

        int searchId = 102;

        System.out.println("Linear Search Result:");

        Product linearResult = linearSearch(products, searchId);

        if (linearResult != null) {
            System.out.println(linearResult);
        } else {
            System.out.println("Product not found.");
        }

        Arrays.sort(products, Comparator.comparingInt(Product::getProductId));

        System.out.println("\nBinary Search Result:");

        Product binaryResult = binarySearch(products, searchId);

        if (binaryResult != null) {
            System.out.println(binaryResult);
        } else {
            System.out.println("Product not found.");
        }
    }
}
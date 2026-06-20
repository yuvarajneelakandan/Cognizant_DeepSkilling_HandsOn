package Recursive_Financial_Forecast;


public class FinancialForecast {

    public static double calculateFutureValue(double currentValue,
                                              double growthRate,
                                              int years) {

        // Base case
        if (years == 0) {
            return currentValue;
        }

        // Recursive case
        return calculateFutureValue(currentValue, growthRate, years - 1)
                * (1 + growthRate);
    }

    public static void main(String[] args) {

        double presentValue = 10000.0;
        double annualGrowthRate = 0.08;   // 8%
        int forecastYears = 5;

        double futureValue = calculateFutureValue(
                presentValue,
                annualGrowthRate,
                forecastYears
        );

        System.out.println("Present Value: Rs. " + presentValue);
        System.out.println("Growth Rate: " + (annualGrowthRate * 100) + "%");
        System.out.println("Forecast Period: " + forecastYears + " years");
        System.out.printf("Predicted Future Value: Rs. %.2f%n", futureValue);
    }
}
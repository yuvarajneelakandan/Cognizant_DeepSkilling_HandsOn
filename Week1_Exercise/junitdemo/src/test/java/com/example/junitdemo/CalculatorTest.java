package com.example.junitdemo;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    private int num1;
    private int num2;

    @BeforeEach
    void setUp() {
        num1 = 10;
        num2 = 5;
        System.out.println("Setting up test data...");
    }

    @AfterEach
    void tearDown() {
        System.out.println("Cleaning up after test...");
    }

    @Test
    void testAddition() {

        // Arrange
        int expected = 15;

        // Act
        int result = num1 + num2;

        // Assert
        assertEquals(expected, result);
    }

    @Test
    void testSubtraction() {

        // Arrange
        int expected = 5;

        // Act
        int result = num1 - num2;

        // Assert
        assertEquals(expected, result);
    }
}
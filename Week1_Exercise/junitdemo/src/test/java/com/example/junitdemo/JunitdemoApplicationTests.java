package com.example.junitdemo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JunitdemoApplicationTests {

	 @Test
    public void testAddition() {
        assertEquals(15, 10 + 5);
    }
}

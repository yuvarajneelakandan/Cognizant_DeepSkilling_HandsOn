package com.cognizant.jwtauthentication.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.jwtauthentication.model.AuthenticationResponse;
import com.cognizant.jwtauthentication.util.JwtUtil;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader("Authorization") String authHeader) {

        LOGGER.info("Start");

        // Remove "Basic " from the Authorization header
        String encodedCredentials = authHeader.substring(6);

        // Decode Base64 encoded credentials
        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);
        String credentials = new String(decodedBytes, StandardCharsets.UTF_8);

        LOGGER.debug("Decoded Credentials : {}", credentials);

        // Extract username and password
        String[] values = credentials.split(":");
        String username = values[0];
        String password = values[1];

        LOGGER.debug("Username : {}", username);
        LOGGER.debug("Password : {}", password);

        // Generate JWT Token
        String token = jwtUtil.generateToken(username);

        LOGGER.info("End");

        return new AuthenticationResponse(token);
    }
}
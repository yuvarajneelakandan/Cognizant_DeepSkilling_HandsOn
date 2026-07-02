package com.cognizant.jwtauthentication.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final String SECRET =
            "cognizantjwtsecretkeycognizantjwtsecretkey";

    private final Key key = new SecretKeySpec(
            SECRET.getBytes(StandardCharsets.UTF_8),
            SignatureAlgorithm.HS256.getJcaName());

    public String generateToken(String username) {

        long currentTime = System.currentTimeMillis();

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(currentTime))
                .expiration(new Date(currentTime + 20 * 60 * 1000))
                .signWith(key)
                .compact();
    }
}
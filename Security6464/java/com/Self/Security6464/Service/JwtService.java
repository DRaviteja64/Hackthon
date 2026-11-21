package com.Self.Security6464.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY =
            "MySuperSecretKeyForJWTAuthentication123456789";

    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    // Generate JWT Token

    public String generateToken(String mobile) {

        long expirationTime = 1000L * 60 * 60; // 1 Hour

        return Jwts.builder()
                .subject(mobile)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + expirationTime)
                )
                .signWith(getKey())
                .compact();
    }

    // Extract Mobile Number

    public String extractMobile(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Validate JWT Token

    public boolean validateToken(String token, String mobile) {

        try {

            String extractedMobile = extractMobile(token);

            return extractedMobile.equals(mobile);

        } catch (io.jsonwebtoken.ExpiredJwtException e) {

            System.out.println("JWT Token Expired!");

            return false;

        } catch (io.jsonwebtoken.JwtException e) {

            System.out.println("Invalid JWT Token: " + e.getMessage());

            return false;
        }
    }
}
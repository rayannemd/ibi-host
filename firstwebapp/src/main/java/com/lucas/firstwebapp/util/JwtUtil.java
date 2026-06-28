package com.lucas.firstwebapp.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "F3xl2/OnFTgbTGXqwrQqH0rFy9j49UWzP1p4bnMV3rc=";

  
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

   
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000); // Expira em 1 hora

        return Jwts.builder()
                .subject(email) // O método .subject() é a convenção mais recente
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey()) // O algoritmo é inferido automaticamente da chave
                .compact();
    }

   
    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token) 
                .getPayload(); 

        return claims.getSubject();
    }

  
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
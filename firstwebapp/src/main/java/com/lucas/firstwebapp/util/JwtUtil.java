package com.lucas.firstwebapp.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Segredo de assinatura do JWT — obrigatório via variável de ambiente JWT_SECRET
    // (mínimo de 32 caracteres para HS256). Nunca versionar o segredo no código.
    @Value("${jwt.secret}")
    private String secret;

    // Tempo de expiração do token em milissegundos (default: 1 hora).
    @Value("${jwt.expiration-ms:3600000}")
    private long expirationMs;

    // Falha rápido no startup se o segredo estiver ausente ou curto demais,
    // em vez de estourar uma exceção genérica (500) só ao gerar/validar token.
    @PostConstruct
    void validarConfiguracao() {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException(
                "Configuração inválida: defina JWT_SECRET (jwt.secret) com no mínimo 32 caracteres (256 bits) para HS256.");
        }
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }


    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

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
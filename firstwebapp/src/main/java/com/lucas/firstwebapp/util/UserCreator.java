package com.lucas.firstwebapp.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserCreator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "adminpousada";
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("crp: " + hashedPassword);

    
    }
}


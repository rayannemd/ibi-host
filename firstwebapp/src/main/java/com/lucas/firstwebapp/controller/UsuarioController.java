package com.lucas.firstwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.LoginRequest;
import com.lucas.firstwebapp.model.Usuario;
import com.lucas.firstwebapp.repository.UsuarioRepository;
import com.lucas.firstwebapp.util.JwtUtil;


@RestController
@RequestMapping("/api") 

public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        String email = loginRequest.getEmail();
        String senha = loginRequest.getSenha();

        Usuario usuario = usuarioRepository.findByEmail(email);
        if(usuario != null && passwordEncoder.matches(senha, usuario.getSenha())){
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(token);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login invalido!");
        }
    }




     
   
    String cadastroUsuario(Usuario usuario){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String crypto = encoder.encode("adminpousada");
        usuario.setSenha(crypto);
        usuarioRepository.save(usuario);
        return "redirect:/login.html";
    }
    /*
    @PostMapping("login")
    String loginUsuario(String login, String senha){
        Usuario usuario = usuarioRepository.findByLogin(login);
        if(usuario != null && passwordEncoder.matches(senha, usuario.getSenha())){
            return "redirect:/menu.html";
        } 
        return "redirect:/login.html";
    }
        */
    
}

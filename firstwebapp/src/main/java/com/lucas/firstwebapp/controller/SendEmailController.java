package com.lucas.firstwebapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.service.SendEmail;

@RestController
@RequestMapping("/api")
public class SendEmailController {
    
    @Autowired
    private SendEmail emailService;

    @PostMapping("/enviarEmail")
    public void enviar(@RequestBody Map <String , String> payload){
        String cpf = payload.get("cpf");
        String operacao = payload.get("operacao");

        emailService.enviarEmail(cpf , operacao);
    }
}
package com.lucas.firstwebapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.lucas.firstwebapp.model.Cliente;
import com.lucas.firstwebapp.repository.ClienteRepository;
import com.lucas.firstwebapp.service.ClienteService;

@Service
public class SendEmail {
    private ClienteRepository clienteRepository;
    
    @Autowired 
    private JavaMailSender emailSender;

    @Autowired
    public SendEmail(ClienteRepository clienteRepository){
        this.clienteRepository = clienteRepository;
    }

    public void enviarEmail(String cpf , String operacao){
        Cliente cliente = clienteRepository.findByCpf(cpf)
            .orElseThrow(()-> new RuntimeException("Cliente não encontrado."));
        
        String emailDestino = cliente.getEmail(); // depois que adicionar o email no bd, né:(

        System.out.println("E-mail encontrado: " + emailDestino);
        if(emailDestino == null){
            System.out.println("tem nada nao maluco"); // ver ser dá pra exibir um alerta lá pro front
        }

        String assunto , mensagem;

        switch(operacao){
            case "reserva":
                assunto = "Confirmação de Reserva na Posada Serrana.";
                mensagem = "Olá, " + cliente.getNome() +"!\n\nEsse email serve para confirmar a sua reserva na Pousada Serrana!\nQualquer dúvida, entre em contato com a nossa equipe.\nEstamos ansiosos para recebe-lô(a).";        
                break;

            case "checkin":
                assunto = "Confirmação de Checkin na pousada Serrana!";
                mensagem = "Olá, " + cliente.getNome() + "!\n\nVocê acabou de realizar o check-in em nossa pousada!\nEstamos muito felizes em ter você aqui!\nQualquer dúvida, entre em contato com a nossa equipe.\n\nBoa estadia!";
                break;
            
            case "checkout":
                assunto = "Confirmação de Checkout na pousada Serrana!";
                mensagem = "Olá, " + cliente.getNome() + "!\n\nVocê acabou de efetuar o seu check-out em nossa pousada!\nEsperamos que tenha tido uma ótima estadia!\n\nAvalie-nos em nossas redes!\n\nbrigado e até a proóxima!";
                break;
            
            default:
                assunto = "Notificação - Pousada";
                mensagem = "Uma ação foi realizada utilizando esse email.";
                break;
        }

        enviarEmailSimples(emailDestino , assunto , mensagem);
        
    }

    private void enviarEmailSimples(String para , String assunto , String corpo){
        try{
            SimpleMailMessage mensagem = new SimpleMailMessage();
            mensagem.setTo(para);
            mensagem.setSubject(assunto);
            mensagem.setText(corpo);
            emailSender.send(mensagem);
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
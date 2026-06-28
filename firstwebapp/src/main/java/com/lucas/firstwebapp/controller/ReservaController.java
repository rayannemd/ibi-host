package com.lucas.firstwebapp.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.Cliente;
import com.lucas.firstwebapp.model.Quarto;
import com.lucas.firstwebapp.model.Reserva;
import com.lucas.firstwebapp.repository.ClienteRepository;
import com.lucas.firstwebapp.repository.QuartoRepository;
import com.lucas.firstwebapp.repository.ReservaRepository;

@RestController
@RequestMapping("/api") 
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private QuartoRepository quartoRepository;

    @PostMapping("/listaReservas")
    public ResponseEntity<List<Reserva>> listarReservasPorCpf(@RequestBody String cpf) {
        System.out.println(cpf);
        cpf = cpf.trim().replaceAll("\\D", "");
        //List <Reserva>listaReservas = reservaRepository.findByClienteCpf(cpf);

        LocalDate hoje = LocalDate.now();
        List<Reserva> listaReservas = reservaRepository.findByClienteCpfAndCheckinRealizadoFalse(cpf, hoje);
        if(listaReservas.isEmpty()){
            System.out.println("TA VAZIO ESSA BOMBA\n");
            return ResponseEntity.ok(new ArrayList<>()); 
        }
        return ResponseEntity.ok(listaReservas);
    }
    
    

    /*@PostMapping("/cadastrarReserva")
    public ResponseEntity<String> cadastrarReserva(@RequestBody Reserva reserva){
        reservaRepository.save(reserva);
        //Enviar mensagem no Whatsapp (reserva.telefone)
        return ResponseEntity.status(HttpStatus.CREATED).body("Reserva realizada!");
    }*/

    @PostMapping("/cadastrarReserva")
    public ResponseEntity<?> cadastrarReserva(@RequestBody Reserva reserva) {

        String cpfCliente = reserva.getCliente().getCpf();


        Optional<Cliente> clienteOpt = clienteRepository.findByCpf(cpfCliente);

        if (clienteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cliente não encontrado");
        }

        int numeroQuarto = reserva.getQuarto().getNumero();
        Optional<Quarto> quartoOpt = quartoRepository.findById(numeroQuarto);

        if (quartoOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quarto não encontrado");
        }

        reserva.setCliente(clienteOpt.get());
        reserva.setQuarto(quartoOpt.get());
        reservaRepository.save(reserva);
        

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    
}



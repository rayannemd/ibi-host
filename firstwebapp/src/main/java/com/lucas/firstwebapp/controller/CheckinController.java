package com.lucas.firstwebapp.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.Checkin;
import com.lucas.firstwebapp.model.Reserva;
import com.lucas.firstwebapp.repository.CheckinRepository;
import com.lucas.firstwebapp.repository.ReservaRepository;

@RestController
@RequestMapping("/api")
public class CheckinController {

    @Autowired
    private CheckinRepository checkinRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @PostMapping("/listaCheckins")
    public ResponseEntity<List<Checkin>> listarCheckinsPorCpf(@RequestBody String cpf) {
        System.out.println(cpf);
        cpf = cpf.trim().replaceAll("\\D", "");
        //List <Reserva>listaReservas = reservaRepository.findByClienteCpf(cpf);
        LocalDate hoje = LocalDate.now();
        List<Checkin> listaCheckins = checkinRepository.findPendentesByCpfCliente(cpf, hoje);
        if(listaCheckins.isEmpty()){
            System.out.println("TA VAZIO ESSA BOMBA de checkovski\n");
            return ResponseEntity.ok(new ArrayList<>()); 
        }
        return ResponseEntity.ok(listaCheckins);
    }
    
    @PostMapping("/cadastrarCheckin")
    public ResponseEntity<?> cadastrarCheckin(@RequestBody Checkin checkin){
    try {
        Optional<Reserva> reservaOpt = reservaRepository.findById(checkin.getReserva().getId());
        if(reservaOpt.isPresent()){
            Reserva reserva = reservaOpt.get();
            reserva.setCheckinRealizado(true);
            reservaRepository.save(reserva);
            checkin.setReserva(reserva);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Reserva não encontrada.");
        }
        
        checkinRepository.save(checkin);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
        e.printStackTrace();  // imprime o erro no console do servidor
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro interno: " + e.getMessage());
        }
    }

    @GetMapping("/proximos-checkins")
    public long getCheckinsPendentesHoje() {
        LocalDate hoje = LocalDate.now();
        return reservaRepository.countByDataCheckin(hoje);
    }
}


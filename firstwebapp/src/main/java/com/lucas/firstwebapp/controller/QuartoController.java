package com.lucas.firstwebapp.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.Checkin;
import com.lucas.firstwebapp.model.Quarto;
import com.lucas.firstwebapp.model.Reserva;
import com.lucas.firstwebapp.repository.CheckinRepository;
import com.lucas.firstwebapp.repository.QuartoRepository;
import com.lucas.firstwebapp.repository.ReservaRepository;

@RestController
@RequestMapping("/api")

public class QuartoController {

@Autowired
private QuartoRepository quartoRepository;

@Autowired
private ReservaRepository reservaRepository;

@Autowired
private CheckinRepository checkinRepository;

@PostMapping("/status-quartos")
public ResponseEntity<List<Map<String, Object>>> verificarStatusQuartos(@RequestBody Map<String, Object> dados) {
    LocalDate dataCheckin = LocalDate.parse((String) dados.get("dataCheckin"));
    int dias = (int) dados.get("dias");
    LocalDate dataCheckout = dataCheckin.plusDays(dias);

    List<Quarto> quartos = quartoRepository.findAll();
    List<Reserva> reservas = reservaRepository.findAll();

    List<Map<String, Object>> statusQuartos = new ArrayList<>();

    for (Quarto quarto : quartos) {
        String status = "LIVRE";

        for (Reserva reserva : reservas) {
            if (reserva.getQuarto().getNumero() == (quarto.getNumero())) {
                LocalDate checkinExistente = reserva.getDataCheckin();
                LocalDate checkoutExistente = reserva.getDataCheckout();

                boolean conflita =
                        !dataCheckout.isBefore(checkinExistente) &&
                        !dataCheckin.isAfter(checkoutExistente);

                if (conflita) {
                    Optional<Checkin> checkinOpt = checkinRepository.findByReserva(reserva);
                    if(checkinOpt.isPresent()){
                        Checkin checkin = checkinOpt.get();
                        status = !checkin.isCheckoutRealizado() ? "OCUPADO" : "LIVRE";

                    }
                    else{
                        status = "RESERVADO";
                    }
                }
            }
        }

        Map<String, Object> quartoStatus = new HashMap<>();
        quartoStatus.put("numero", quarto.getNumero());
        quartoStatus.put("status", status);

        statusQuartos.add(quartoStatus);
    }

    return ResponseEntity.ok(statusQuartos);
}


}

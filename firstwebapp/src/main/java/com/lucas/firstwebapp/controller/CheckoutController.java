package com.lucas.firstwebapp.controller;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.Checkin;
import com.lucas.firstwebapp.model.Checkout;
import com.lucas.firstwebapp.repository.CheckinRepository;
import com.lucas.firstwebapp.repository.CheckoutRepository;

@RestController
@RequestMapping("/api")

@Controller
public class CheckoutController {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private CheckinRepository checkinRepository;

    @PostMapping("/cadastrarCheckout")
    public ResponseEntity<?> cadastrarCheckout(@RequestBody Checkout checkout){
        try{
            Optional<Checkin> checkinOpt = checkinRepository.findById(checkout.getCheckin().getId());
            if(checkinOpt.isPresent()){
                Checkin checkin = checkinOpt.get();
                checkin.setCheckoutRealizado(true);
                checkinRepository.save(checkin);
                checkout.setCheckin(checkin);
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Checkin nao encontrado!");
            }
            checkoutRepository.save(checkout);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro interno: " + e.getMessage());
        }
    }

    @GetMapping("/proximos-checkouts")
    public long getCheckoutsPendentesHoje() {
        LocalDate hoje = LocalDate.now();
        return checkinRepository.countByDataCheckout(hoje);
    }
}
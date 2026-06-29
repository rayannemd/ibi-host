package com.lucas.firstwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.firstwebapp.model.Cliente;
import com.lucas.firstwebapp.repository.ClienteRepository;
import com.lucas.firstwebapp.service.ClienteService;

@RestController
@RequestMapping("/api") 

@Controller
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired 
    private ClienteService clienteService;

    @PostMapping("/registerGuest")
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente){
        clienteRepository.save(cliente);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping("/checkGuests")
    public ResponseEntity<Cliente> encontrarCliente(@RequestBody Cliente cliente){
        Cliente customer = clienteService.buscarPorCpf(cliente.getCpf());
        return ResponseEntity.ok(customer);
    }
}

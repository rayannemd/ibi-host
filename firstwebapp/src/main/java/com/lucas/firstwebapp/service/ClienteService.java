package com.lucas.firstwebapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucas.firstwebapp.model.Cliente;
import com.lucas.firstwebapp.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente buscarPorCpf(String cpf){
        return clienteRepository.findByCpf(cpf)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }
}

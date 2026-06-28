package com.lucas.firstwebapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    public String getNome(){
        return this.nome;
    }

    public String getEndereco(){
        return this.endereco;
    }


    public String getCpf(){
        return this.cpf;
    }

    public String getTelefone(){
        return this.telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    } 

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public void setTelefone(String telefone){
        this.telefone = telefone;
    }
}



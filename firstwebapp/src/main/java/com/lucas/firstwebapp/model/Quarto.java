package com.lucas.firstwebapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quarto")
public class Quarto {
    @Id
    private int numero;
    private String tipo;
    private String status;
    private String descricao;
    //@OneToOne(mappedBy = "quarto")
    //private Reserva reserva;

    public int getNumero() {
        return numero;
    }

    public String getTipo() {
        return tipo;
    }

    public String getStatus() {
        return status;
    }

    //public Reserva getReserva() {
    //    return reserva;
    //}

    //public void setReserva(Reserva reserva) {
    //    this.reserva = reserva;
    //}

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
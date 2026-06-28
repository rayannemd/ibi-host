package com.lucas.firstwebapp.model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "qtd_pessoas")
    private int qtdPessoas;

    @Column(name = "data_checkin")
    private LocalDate dataCheckin;

    @Column(name = "data_checkout")
    private LocalDate dataCheckout;

    @Column(name = "valor_reserva")
    private float valorReserva;

    @Column(name = "checkin_realizado")
    private boolean checkinRealizado = false;

    @ManyToOne
    @JoinColumn(name = "numero_quarto", referencedColumnName = "numero")
    private Quarto quarto;

    @ManyToOne
    @JoinColumn(name = "cpf_cliente", referencedColumnName = "cpf")
    private Cliente cliente;

    // @OneToOne
    // @JoinColumn(name = "id_pagamento", referencedColumnName = "id")
    // private Pagamento pagamento;

    public Long getId() {
        return id;
    }

    public int getQtdPessoas() {
        return qtdPessoas;
    }


    public Quarto getQuarto() {
        return quarto;
    }

    public LocalDate getDataCheckin() {
        return dataCheckin;
    }

    public LocalDate getDataCheckout() {
        return dataCheckout;
    }

    public float getValorReserva() {
        return valorReserva;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public boolean isCheckinRealizado() {
        return checkinRealizado;
    }

    // public Pagamento getPagamento() {
    //     return pagamento;
    // }
    
    
    public void setId(Long id) {
        this.id = id;
    }

    public void setQtdPessoas(int qtdPessoas) {
        this.qtdPessoas = qtdPessoas;
    }

    public void setQuarto(Quarto quarto) {
        this.quarto = quarto;
    }

    public void setDataCheckin(LocalDate dataCheckin) {
        this.dataCheckin = dataCheckin;
    }

    public void setDataCheckout(LocalDate dataCheckout) {
        this.dataCheckout = dataCheckout;
    }

    public void setValorReserva(float valorReserva) {
        this.valorReserva = valorReserva;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    // public void setPagamento(Pagamento pagamento) {
    //     this.pagamento = pagamento;
    // }

    public void setCheckinRealizado(boolean checkinRealizado) {
        this.checkinRealizado = checkinRealizado;
    }
    
}

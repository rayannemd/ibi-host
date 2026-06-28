package com.lucas.firstwebapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "checkout")
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nome_cliente")
    private String clienteNome;

    @Column(name = "data_checkout")
    private LocalDate dataSaida;

    @Column(name = "valor_total")
    private Double valorTotal;

    @OneToOne
    @JoinColumn(name = "id_checkin", referencedColumnName = "id")
    private Checkin checkin;

    public Long getId() {
        return id;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public LocalDate getDataSaida() {
        return dataSaida;
    }

    public Double getValorTotal() {
        return valorTotal;
    }
    
    public Checkin getCheckin() {
        return checkin;
    }

    public void setCheckin(Checkin checkin) {
        this.checkin = checkin;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public void setDataSaida(LocalDate dataSaida) {
        this.dataSaida = dataSaida;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}

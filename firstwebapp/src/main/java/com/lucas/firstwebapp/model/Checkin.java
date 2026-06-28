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
@Table(name = "checkin")
public class Checkin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_checkin")
    private float valorCheckin;

    @Column(name = "data_checkin")
    private LocalDate dataCheckin;

    @Column(name = "checkout_realizado")
    private boolean checkoutRealizado = false;


    @OneToOne
    @JoinColumn(name = "id_reserva", referencedColumnName = "id")
    private Reserva reserva;

    public Long getId() {
        return id;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public LocalDate getDataCheckin() {
        return dataCheckin;
    }

    public boolean isCheckoutRealizado() {
        return checkoutRealizado;
    }
    

    public float getValorCheckin() {
        return valorCheckin;
    }

    public void setValorCheckin(float valorCheckin) {
        this.valorCheckin = valorCheckin;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public void setDataCheckin(LocalDate dataCheckin) {
        this.dataCheckin = dataCheckin;
    }

    public void setCheckoutRealizado(boolean checkoutRealizado) {
        this.checkoutRealizado = checkoutRealizado;
    }
}

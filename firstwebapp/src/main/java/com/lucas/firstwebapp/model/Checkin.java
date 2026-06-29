package com.lucas.firstwebapp.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "checkin")
@Getter
@Setter
@NoArgsConstructor
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
}

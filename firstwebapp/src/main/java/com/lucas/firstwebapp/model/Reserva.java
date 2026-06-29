package com.lucas.firstwebapp.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reserva")
@Getter
@Setter
@NoArgsConstructor
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
}

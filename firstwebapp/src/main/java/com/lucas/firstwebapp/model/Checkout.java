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
@Table(name = "checkout")
@Getter
@Setter
@NoArgsConstructor
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
}

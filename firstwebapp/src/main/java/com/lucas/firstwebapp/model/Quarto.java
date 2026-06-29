package com.lucas.firstwebapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quarto")
@Getter
@Setter
@NoArgsConstructor
public class Quarto {
    @Id
    private int numero;
    private String tipo;
    private String status;
    private String descricao;
}

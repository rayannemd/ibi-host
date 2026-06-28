package com.lucas.firstwebapp.repository;

import java.time.LocalDate;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lucas.firstwebapp.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

    @Query("SELECT r FROM Reserva r WHERE r.cliente.cpf = :cpf AND r.checkinRealizado = false AND r.dataCheckin = :hoje")
    List<Reserva> findByClienteCpfAndCheckinRealizadoFalse(String cpf, @Param("hoje") LocalDate hoje);

    @Query("SELECT COUNT(r) FROM Reserva r WHERE r.dataCheckin = :dataHoje AND r.checkinRealizado = false")
    long countByDataCheckin(@Param("dataHoje") LocalDate dataHoje);

    

}

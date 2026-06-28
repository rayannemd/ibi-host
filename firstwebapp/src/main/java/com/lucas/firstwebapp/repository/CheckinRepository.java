package com.lucas.firstwebapp.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lucas.firstwebapp.model.Checkin;
import com.lucas.firstwebapp.model.Reserva;

@Repository
public interface CheckinRepository extends JpaRepository<Checkin, Long>{
    List<Checkin> findByCheckoutRealizadoFalse();

    @Query("SELECT c FROM Checkin c WHERE c.checkoutRealizado = false AND c.reserva.cliente.cpf = :cpf AND c.reserva.dataCheckout = :hoje")
    List<Checkin> findPendentesByCpfCliente(@Param("cpf") String cpf, @Param("hoje") LocalDate hoje);

    @Query("SELECT COUNT(c) FROM Checkin c JOIN c.reserva r WHERE r.dataCheckout = :dataHoje AND c.checkoutRealizado = false")
    long countByDataCheckout(@Param("dataHoje") LocalDate dataHoje);

    Optional<Checkin> findByReserva(Reserva reserva);
}

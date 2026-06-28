package com.lucas.firstwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lucas.firstwebapp.model.Quarto;

@Repository
public interface QuartoRepository extends JpaRepository<Quarto, Integer> {
    
}
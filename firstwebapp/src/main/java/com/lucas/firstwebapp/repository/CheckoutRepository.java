package com.lucas.firstwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucas.firstwebapp.model.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long>{

}

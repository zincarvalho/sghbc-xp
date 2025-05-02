package com.projeto.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.hospital.entity.Enfermeiro;

@Repository
public interface EnfermeiroRepository extends JpaRepository<Enfermeiro, Integer>{
	Optional<Enfermeiro> findByCoren(String coren);
}

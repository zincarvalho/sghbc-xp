package com.projeto.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.hospital.entity.Recepcionista;

@Repository
public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Integer> {
}

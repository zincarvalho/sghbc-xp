package com.projeto.hospital.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Repository;

import com.projeto.hospital.entity.Recepcionista;



@Repository
public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Long> {
}

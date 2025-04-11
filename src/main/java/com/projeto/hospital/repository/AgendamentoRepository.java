package com.projeto.hospital.repository;

import com.projeto.hospital.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
    // pode adicionar métodos customizados aqui no futuro
}

package com.hospitalproject.repository;

import com.hospitalproject.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query("SELECT a FROM Agendamento a JOIN a.paciente p WHERE " +
           "(:nome IS NULL OR p.nome LIKE %:nome%) OR " +
           "(:cpf IS NULL OR p.cpf = :cpf)")
    List<Agendamento> findByNomeOrCpf(String nome, String cpf);
}
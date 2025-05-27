package com.projeto.hospital.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.hospital.entity.Exame;

@Repository
public interface ExameRepository extends JpaRepository<Exame, Integer> {

  // Buscar exames por paciente
  List<Exame> findByPacienteNomeContainingIgnoreCase(String nomePaciente);

  // Buscar exames por status
  List<Exame> findByStatusContainingIgnoreCase(String status);

  // Buscar exames por tipo
  List<Exame> findByTipoContainingIgnoreCase(String tipo);

  // Buscar exames por data
  List<Exame> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);

  // Buscar exames por cpf
  @Query("SELECT e FROM Exame e WHERE REPLACE(REPLACE(REPLACE(e.paciente.cpf, '.', ''), '-', ''), ' ', '') = :cpf")
  List<Exame> findByCpfPaciente(@Param("cpf") String cpf);

}

package com.projeto.hospital.repository;

import com.projeto.hospital.entity.Paciente;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

  List<Paciente> findByConvenioId(Integer idConvenio);

  List<Paciente> findByNomeContainingIgnoreCase(String nome);

  Optional<Paciente> findByCpf(String cpf);

  @Query("SELECT p FROM Paciente p WHERE LOWER(p.endereco.cidade) LIKE LOWER(CONCAT('%', :cidade, '%'))")
  List<Paciente> findByCidade(@Param("cidade") String cidade);
}

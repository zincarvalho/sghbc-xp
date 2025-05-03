package com.projeto.hospital.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.projeto.hospital.entity.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
    @Query("SELECT a FROM Agendamento a WHERE a.paciente.nome LIKE %:termo% OR a.paciente.cpf LIKE %:termo%")
    List<Agendamento> findByPacienteNomeOuCpf(@Param("termo") String termo);

    @Query("SELECT COUNT(a) > 0 FROM Agendamento a WHERE a.medico.id = :medicoId AND a.dataHora = :dataHora AND a.status = 'AGENDADO'")
    boolean medicoDisponivel(@Param("medicoId") Integer medicoId, @Param("dataHora") LocalDateTime dataHora);

    // Query to find appointments by doctor ID and date (comparing only the date part)
    // Note: Using FUNCTION('DATE', ...) might be database-specific. H2 supports it.
    // For portability, consider fetching by a date range (start and end of the day).
    @Query("SELECT a FROM Agendamento a WHERE a.medico.id = :medicoId AND FUNCTION('DATE', a.dataHora) = FUNCTION('DATE', :data)")
    List<Agendamento> findByMedicoIdAndData(@Param("medicoId") Integer medicoId, @Param("data") LocalDateTime data);
}


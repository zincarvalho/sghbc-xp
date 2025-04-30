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

    @Query(value = "SELECT COUNT(*) > 0 FROM agendamento as a WHERE a.id_medico = :medicoId AND DATE(a.data_hora_entrada) = :data_hora_entrada AND a.status = 'Agendado'", nativeQuery = true)
    int medicoDisponivel(Integer medicoId, LocalDateTime data_hora_entrada);
}

package com.prontuarioeletronico.repository;

import com.prontuarioeletronico.entity.Consulta;
import com.prontuarioeletronico.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findByPaciente(Paciente paciente);
}
package com.prontuarioeletronico.service;

import com.prontuarioeletronico.entity.Consulta;
import com.prontuarioeletronico.entity.Paciente;
import com.prontuarioeletronico.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    public List<Consulta> listarTodas() {
        return consultaRepository.findAll();
    }

    public List<Consulta> listarPorPaciente(Paciente paciente) {
        return consultaRepository.findByPaciente(paciente);
    }

    public Optional<Consulta> buscarPorId(Long id) {
        return consultaRepository.findById(id);
    }

    public Consulta salvar(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    public void deletar(Long id) {
        consultaRepository.deleteById(id);
    }
}
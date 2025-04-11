package com.hospitalproject.controller;

import com.hospitalproject.dto.AgendamentoDTO;
import com.hospitalproject.enums.StatusAgendamento;
import com.hospitalproject.model.Agendamento;
import com.hospitalproject.repository.AgendamentoRepository;
import com.hospitalproject.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<AgendamentoDTO> listarAgendamentos() {
        return agendamentoRepository.findAll().stream().map(agendamento -> {
            AgendamentoDTO dto = new AgendamentoDTO();
            dto.setIdAgendamento(agendamento.getId());
            dto.setNomePaciente(agendamento.getPaciente().getNome());
            dto.setStatus(agendamento.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{id}/status")
    public Agendamento atualizarStatus(@PathVariable Integer id, @RequestParam StatusAgendamento status) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
        agendamento.setStatus(status);
        return agendamentoRepository.save(agendamento);
    }
}

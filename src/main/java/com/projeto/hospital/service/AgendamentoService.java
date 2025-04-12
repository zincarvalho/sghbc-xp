package com.projeto.hospital.service;

import com.projeto.hospital.entity.Agendamento;
import com.projeto.hospital.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public Optional<Agendamento> buscarPorId(Integer id) {
        return agendamentoRepository.findById(id);
    }

    public List<Agendamento> buscarPorNomeOuCpfPaciente(String termo) {
        return agendamentoRepository.findByPacienteNomeOuCpf(termo);
    }

    public Agendamento salvar(Agendamento agendamento) {

        if (agendamentoRepository.medicoDisponivel(agendamento.getMedico().getId(),
                agendamento.getDataHoraEntrada())) {
            throw new RuntimeException("Médico já possui agendamento neste horário");
        }

        if (agendamento.getId() == null) {
            agendamento.setStatus(Agendamento.StatusAgendamento.Agendado);
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento alterarStatus(Integer id, Agendamento.StatusAgendamento novoStatus) {
        return agendamentoRepository.findById(id)
                .map(agendamento -> {
                    agendamento.setStatus(novoStatus);
                    return agendamentoRepository.save(agendamento);
                })
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    }

    public void deletar(Integer id) {
        agendamentoRepository.deleteById(id);
    }
}

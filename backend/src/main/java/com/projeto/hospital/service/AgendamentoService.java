package com.projeto.hospital.service;

import com.projeto.hospital.entity.Agendamento;
import com.projeto.hospital.entity.StatusAgendamento; // Import added
import com.projeto.hospital.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

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

    public List<Agendamento> buscarPorMedicoIdEData(Integer medicoId, LocalDateTime data) {
        // O repositório espera LocalDateTime, mas a query usa DATE(), então podemos
        // passar o início do dia.
        // Ou ajustar a query/parâmetro se necessário. Por agora, passamos o
        // LocalDateTime.
        return agendamentoRepository.findByMedicoIdAndData(medicoId, data);
    }

    public Agendamento salvar(Agendamento agendamento) {

        // TODO: Reimplementar a lógica de verificação de disponibilidade do médico
        // if (agendamentoRepository.medicoDisponivel(agendamento.getMedico().getId(),
        // agendamento.getDataHora())) { // Corrigido para getDataHora
        // throw new RuntimeException("Médico já possui agendamento neste horário");
        // }

        if (agendamento.getId() == null) {
            agendamento.setStatus(StatusAgendamento.AGENDADO);
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento alterarStatus(Integer id, StatusAgendamento novoStatus) {
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

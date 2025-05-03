package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Agendamento;
import com.projeto.hospital.entity.StatusAgendamento;
import com.projeto.hospital.service.AgendamentoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodos() {
        List<Agendamento> agendamentos = agendamentoService.listarTodos();
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Integer id) {
        return agendamentoService.buscarPorId(id)
                .map(agendamento -> new ResponseEntity<>(agendamento, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/paciente/busca")
    public ResponseEntity<List<Agendamento>> buscarPorNomeOuCpfPaciente(@RequestParam String termo) {
        List<Agendamento> agendamentos = agendamentoService.buscarPorNomeOuCpfPaciente(termo);
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }

    // Endpoint para buscar agendamentos por médico e data
    @GetMapping("/medico/{medicoId}/data/{data}")
    public ResponseEntity<List<Agendamento>> buscarPorMedicoEData(
            @PathVariable Integer medicoId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        // Converter LocalDate para LocalDateTime (início do dia) para o método do
        // serviço
        LocalDateTime dataHoraInicio = data.atStartOfDay();
        List<Agendamento> agendamentos = agendamentoService.buscarPorMedicoIdEData(medicoId, dataHoraInicio);
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Agendamento agendamento) {
        try {
            // TODO: Adicionar validação para disponibilidade do médico antes de salvar
            Agendamento novoAgendamento = agendamentoService.salvar(agendamento);
            return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retornar mensagens de erro específicas se possível (por exemplo, conflito)
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    // Considerar usar PUT para atualizações completas se necessário
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAgendamento(@PathVariable Integer id, @RequestBody Agendamento agendamento) {
        // Garantir que o ID na URL seja igual ao ID no corpo da requisição, ou defina-o
        if (agendamento.getId() != null && !agendamento.getId().equals(id)) {
            return new ResponseEntity<>("ID na URL difere do ID no corpo da requisição", HttpStatus.BAD_REQUEST);
        }
        agendamento.setId(id); // Defina o ID da URL

        // Verificar se o agendamento existe antes de tentar atualizar
        if (!agendamentoService.buscarPorId(id).isPresent()) {
            return new ResponseEntity<>("Agendamento não encontrado", HttpStatus.NOT_FOUND);
        }

        try {
            // TODO: Adicionar validação para disponibilidade do médico antes de salvar
            Agendamento agendamentoAtualizado = agendamentoService.salvar(agendamento); // Usar salvar para criar e
                                                                                        // atualizar
            return new ResponseEntity<>(agendamentoAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT); // Ou outro status apropriado
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> alterarStatus(
            @PathVariable Integer id,
            @RequestParam StatusAgendamento status) {
        try {
            Agendamento agendamentoAtualizado = agendamentoService.alterarStatus(id, status);
            return new ResponseEntity<>(agendamentoAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (agendamentoService.buscarPorId(id).isPresent()) {
            agendamentoService.deletar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

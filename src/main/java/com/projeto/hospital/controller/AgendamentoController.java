package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Agendamento;
import com.projeto.hospital.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Agendamento getAgendamentoById(@PathVariable Integer id) {
        return agendamentoService.buscarPorId(id);
    }

    @PostMapping
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.salvar(agendamento);
    }

    @PutMapping("/{id}")
    public Agendamento updateAgendamento(@PathVariable Integer id, @RequestBody Agendamento agendamento) {
        agendamento.setId(id);
        return agendamentoService.salvar(agendamento);
    }

    @DeleteMapping("/{id}")
    public void deleteAgendamento(@PathVariable Integer id) {
        agendamentoService.deletar(id);
    }
}
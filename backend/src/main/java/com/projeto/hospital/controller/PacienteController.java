package com.projeto.hospital.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.hospital.entity.Paciente;
import com.projeto.hospital.service.PacienteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<Paciente> salvar(@Valid @RequestBody Paciente paciente) {
        Paciente salvo = pacienteService.salvar(paciente);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listarTodos() {
        List<Paciente> pacientes = pacienteService.listarTodos();
        return ResponseEntity.ok(pacientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Integer id) {
        Optional<Paciente> paciente = pacienteService.buscarPorId(id);
        return paciente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar-por-nome")
    public ResponseEntity<List<Paciente>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(pacienteService.buscarPorNome(nome));
    }

    @GetMapping("/buscar-por-cpf")
    public ResponseEntity<Paciente> buscarPorCpf(@RequestParam String cpf) {
        return pacienteService.buscarPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar-por-cidade")
    public ResponseEntity<List<Paciente>> buscarPorCidade(@RequestParam String cidade) {
        return ResponseEntity.ok(pacienteService.buscarPorCidade(cidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> atualizar(@PathVariable Integer id, @RequestBody Paciente pacienteAtualizado) {
        try {
            Paciente atualizado = pacienteService.atualizar(id, pacienteAtualizado);
            return ResponseEntity.ok(atualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        pacienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

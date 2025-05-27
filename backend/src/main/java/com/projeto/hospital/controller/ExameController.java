package com.projeto.hospital.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.hospital.entity.Exame;
import com.projeto.hospital.service.ExameService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/exames")
public class ExameController {

    @Autowired
    private ExameService exameService;

    @PostMapping
    public ResponseEntity<?> salvar(@Valid @RequestBody Exame exame, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> erros = new HashMap<>();
            bindingResult.getFieldErrors().forEach(erro -> {
                erros.put(erro.getField(), erro.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(erros);
        }

        Exame exameSalvo = exameService.salvar(exame);
        return ResponseEntity.status(HttpStatus.CREATED).body(exameSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Exame>> buscarTodos() {
        List<Exame> exames = exameService.buscarTodos();
        return ResponseEntity.ok(exames);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exame> buscarPorId(@PathVariable Integer id) {
        Exame exame = exameService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Exame não encontrado"));
        return ResponseEntity.ok(exame);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Exame>> buscarPorStatus(@PathVariable String status) {
        List<Exame> exames = exameService.buscarPorStatus(status);
        if (exames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exames);
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<List<Exame>> buscarPorData(@PathVariable String data) {
        try {
            LocalDate dataConvertida = LocalDate.parse(data); // formato esperado: yyyy-MM-dd
            List<Exame> exames = exameService.buscarPorData(dataConvertida);
            if (exames.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(exames);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 🔧 Corrigido: CPF como parte da URL, mais RESTful
    @GetMapping("/paciente/cpf/{cpf}")
    public ResponseEntity<List<Exame>> buscarPorCpfPaciente(@PathVariable String cpf) {
        List<Exame> exames = exameService.buscarPorCpfPaciente(cpf);
        if (exames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exames);
    }

    @GetMapping("/ordenados/data")
    public List<Exame> buscarTodosOrdenadosPorData() {
        return exameService.buscarTodosOrdenadoPorData();
    }

    @GetMapping("/paciente/nome/{nomePaciente}")
    public ResponseEntity<List<Exame>> buscarPorNomePaciente(@PathVariable String nomePaciente) {
        List<Exame> exames = exameService.buscarPorNomePaciente(nomePaciente);
        if (exames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exames);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Exame>> buscarPorTipo(@PathVariable String tipo) {
        List<Exame> exames = exameService.buscarPorTipo(tipo);
        if (exames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exames);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exame> atualizar(@PathVariable Integer id, @RequestBody Exame exameAtualizado) {
        Exame atualizado = exameService.atualizar(id, exameAtualizado);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        exameService.remover(id);
        return ResponseEntity.noContent().build();
    }
}

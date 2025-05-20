package com.hospitalproject.controller;

import com.hospitalproject.model.Exame;
import com.hospitalproject.service.ExameService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        LocalDate dataConvertida = LocalDate.parse(data); // espera o formato yyyy-MM-dd
        List<Exame> exames = exameService.buscarPorData(dataConvertida);

        if (exames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exames);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping("/paciente/cpf")
    public List<Exame> buscarPorCpfPaciente(@RequestParam("valor") String cpf) {
    return exameService.buscarPorCpfPaciente(cpf);
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

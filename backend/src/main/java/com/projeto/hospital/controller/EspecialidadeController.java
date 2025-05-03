package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Especialidade;
import com.projeto.hospital.service.EspecialidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/especialidades")
public class EspecialidadeController {

    @Autowired
    private EspecialidadeService especialidadeService;

    @GetMapping
    public ResponseEntity<List<Especialidade>> listarTodos() {
        return ResponseEntity.ok(especialidadeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(especialidadeService.buscarPorId(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Especialidade> salvar(@RequestBody Especialidade especialidade) {
        return ResponseEntity.status(HttpStatus.CREATED).body(especialidadeService.salvar(especialidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Especialidade> atualizar(@PathVariable Integer id, @RequestBody Especialidade especialidadeAtualizada) {
        especialidadeAtualizada.setId(id);
        return ResponseEntity.ok(especialidadeService.atualizar(id, especialidadeAtualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        especialidadeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}


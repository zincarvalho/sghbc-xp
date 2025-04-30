package com.projeto.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.hospital.entity.Especialidade;
import com.projeto.hospital.service.EspecialidadeService;

import java.util.List;

@RestController
@RequestMapping("/especialidades")
public class EspecialidadeController {
    @Autowired
    private EspecialidadeService especialidadeService;

    @GetMapping
    public ResponseEntity<List<Especialidade>> listarTodos() {
        List<Especialidade> especialidades = especialidadeService.listarTodos();
        return new ResponseEntity<>(especialidades, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> buscarPorId(@PathVariable Integer id) {
        return especialidadeService.buscarPorId(id)
                .map(especialidade -> new ResponseEntity<>(especialidade, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Especialidade> cadastrar(@RequestBody Especialidade especialidade) {
        Especialidade novaEspecialidade = especialidadeService.salvar(especialidade);
        return new ResponseEntity<>(novaEspecialidade, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Especialidade> atualizar(@PathVariable Integer id, @RequestBody Especialidade especialidade) {
        try {
            Especialidade especialidadeAtualizada = especialidadeService.atualizar(id, especialidade).get();
            return new ResponseEntity<>(especialidadeAtualizada, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (especialidadeService.buscarPorId(id).isPresent()) {
            especialidadeService.deletar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

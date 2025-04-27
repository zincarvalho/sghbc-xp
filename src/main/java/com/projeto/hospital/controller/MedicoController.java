package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Medico;
import com.projeto.hospital.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    // GET - Listar todos os médicos
    @GetMapping
    public List<Medico> listarTodos() {
        return medicoService.listarTodos();
    }

    // GET - Buscar médico por ID
    @GetMapping("/{id}")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Integer id) {
        Optional<Medico> medico = medicoService.buscarPorId(id);
        return medico.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // POST - Criar novo médico
    @PostMapping
    public ResponseEntity<Medico> salvar(@RequestBody Medico medico) {
        Medico medicoSalvo = medicoService.salvar(medico);
        return ResponseEntity.ok(medicoSalvo);
    }

    // PUT - Atualizar médico existente
    @PutMapping("/{id}")
    public ResponseEntity<Medico> atualizar(@PathVariable Integer id, @RequestBody Medico dadosAtualizados) {
        Optional<Medico> medicoAtualizado = medicoService.atualizar(id, dadosAtualizados);
        return medicoAtualizado.map(ResponseEntity::ok)
                               .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Remover médico
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        boolean deletado = medicoService.deletar(id);
        return deletado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}

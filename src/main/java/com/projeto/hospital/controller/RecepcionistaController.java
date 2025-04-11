package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Recepcionista;
import com.projeto.hospital.service.RecepcionistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recepcionistas")
public class RecepcionistaController {

    @Autowired
    private RecepcionistaService recepcionistaService;

    @GetMapping
    public List<Recepcionista> listarTodos() {
        return recepcionistaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recepcionista> buscarPorId(@PathVariable Long id) {
        Optional<Recepcionista> recepcionista = recepcionistaService.buscarPorId(id);
        return recepcionista.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recepcionista salvar(@RequestBody Recepcionista recepcionista) {
        return recepcionistaService.salvar(recepcionista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Recepcionista> recepcionista = recepcionistaService.buscarPorId(id);
        if (recepcionista.isPresent()) {
            recepcionistaService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
package com.projeto.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.hospital.entity.Recepcionista;
import com.projeto.hospital.service.RecepcionistaService;

@RestController
@RequestMapping("/recepcionistas")
public class RecepcionistaController {

    private final RecepcionistaService recepcionistaService;

    @Autowired
    public RecepcionistaController(RecepcionistaService recepcionistaService) {
        this.recepcionistaService = recepcionistaService;
    }

    @GetMapping
    public ResponseEntity<List<Recepcionista>> listarTodos() {
        List<Recepcionista> recepcionistas = recepcionistaService.listarTodos();
        return new ResponseEntity<>(recepcionistas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recepcionista> buscarPorId(@PathVariable Integer id) {
        return recepcionistaService.buscarPorId(id)
                .map(recepcionista -> new ResponseEntity<>(recepcionista, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Recepcionista> cadastrar(@RequestBody Recepcionista recepcionista) {
        if (recepcionistaService.buscarPorCpf(recepcionista.getCpf()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Recepcionista novoRecepcionista = recepcionistaService.salvar(recepcionista);
        return new ResponseEntity<>(novoRecepcionista, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recepcionista> atualizar(@PathVariable Integer id, @RequestBody Recepcionista recepcionista) {
        try {
            Recepcionista recepcionistaAtualizado = recepcionistaService.atualizar(id, recepcionista);
            return new ResponseEntity<>(recepcionistaAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (recepcionistaService.buscarPorId(id).isPresent()) {
            recepcionistaService.deletar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

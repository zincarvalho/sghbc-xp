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

import com.projeto.hospital.entity.Enfermeiro;
import com.projeto.hospital.service.EnfermeiroService;

@RestController
@RequestMapping("/enfermeiros")
public class EnfermeiroController {

    private final EnfermeiroService enfermeiroService;
    
    @Autowired
    public EnfermeiroController(EnfermeiroService enfermeiroService) {
        this.enfermeiroService = enfermeiroService;
    }
    
    @GetMapping
    public ResponseEntity<List<Enfermeiro>> listarTodos() {
        List<Enfermeiro> enfermeiros = enfermeiroService.listarTodos();
        return new ResponseEntity<>(enfermeiros, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Enfermeiro> buscarPorId(@PathVariable Integer id) {
        return enfermeiroService.buscarPorId(id)
            .map(enfermeiro -> new ResponseEntity<>(enfermeiro, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/coren/{coren}")
    public ResponseEntity<Enfermeiro> buscarPorCoren(@PathVariable String coren) {
        return enfermeiroService.buscarPorCoren(coren)
            .map(enfermeiro -> new ResponseEntity<>(enfermeiro, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping
    public ResponseEntity<Enfermeiro> cadastrar(@RequestBody Enfermeiro enfermeiro) {
        if (enfermeiroService.buscarPorCoren(enfermeiro.getCoren()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Enfermeiro novoEnfermeiro = enfermeiroService.salvar(enfermeiro);
        return new ResponseEntity<>(novoEnfermeiro, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Enfermeiro> atualizar(@PathVariable Integer id, @RequestBody Enfermeiro enfermeiro) {
        try {
            Enfermeiro enfermeiroAtualizado = enfermeiroService.atualizar(id, enfermeiro);
            return new ResponseEntity<>(enfermeiroAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (enfermeiroService.buscarPorId(id).isPresent()) {
            enfermeiroService.deletar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

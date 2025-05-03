package com.projeto.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.hospital.entity.Convenio;
import com.projeto.hospital.service.ConvenioService;

import java.util.List;

@RestController
@RequestMapping("/convenios")
public class ConvenioController {

    @Autowired
    private ConvenioService convenioService;

    @PostMapping
    public Convenio salvar(@RequestBody Convenio convenio) {
        return convenioService.salvar(convenio);
    }

    @GetMapping
    public List<Convenio> listarTodos() {
        return convenioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Convenio buscarPorId(@PathVariable Integer id) {
        return convenioService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));
    }

    @PutMapping("/{id}")
    public Convenio atualizar(@PathVariable Integer id, @RequestBody Convenio convenioAtualizado) {
        return convenioService.atualizar(id, convenioAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        convenioService.deletar(id);
    }
}

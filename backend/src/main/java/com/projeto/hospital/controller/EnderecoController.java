package com.projeto.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.hospital.entity.Endereco;
import com.projeto.hospital.service.EnderecoService;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping
    public Endereco salvar(@RequestBody Endereco endereco) {
        return enderecoService.salvar(endereco);
    }

    @GetMapping
    public List<Endereco> listarTodos() {
        return enderecoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Endereco buscarPorId(@PathVariable Integer id) {
        return enderecoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        enderecoService.deletar(id);
    }

    @PutMapping("/{id}")
    public Endereco atualizar(@PathVariable Integer id, @RequestBody Endereco enderecoAtualizado) {
        return enderecoService.atualizar(id, enderecoAtualizado);
    }

}

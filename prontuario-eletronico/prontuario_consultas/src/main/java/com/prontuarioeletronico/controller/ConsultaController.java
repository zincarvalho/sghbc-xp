package com.prontuarioeletronico.controller;

import com.prontuarioeletronico.entity.Consulta;
import com.prontuarioeletronico.entity.Paciente;
import com.prontuarioeletronico.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping
    public List<Consulta> listarTodas() {
        return consultaService.listarTodas();
    }

    @GetMapping("/paciente")
    public List<Consulta> listarPorPaciente(@RequestBody Paciente paciente) {
        return consultaService.listarPorPaciente(paciente);
    }

    @GetMapping("/{id}")
    public Optional<Consulta> buscarPorId(@PathVariable Long id) {
        return consultaService.buscarPorId(id);
    }

    @PostMapping
    public Consulta salvar(@RequestBody Consulta consulta) {
        return consultaService.salvar(consulta);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        consultaService.deletar(id);
    }
}
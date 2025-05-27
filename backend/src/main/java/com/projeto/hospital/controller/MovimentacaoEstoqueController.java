
package com.projeto.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.hospital.entity.MovimentacaoEstoque;
import com.projeto.hospital.service.MovimentacaoEstoqueService;

// Controlador responsavel pelos endpoints relacionados a movimentacao de estoque
// O prefixo "/estoque" sera usado em todas as rotas deste controlador.
@RestController
@RequestMapping("/estoque")
public class MovimentacaoEstoqueController {

    @Autowired
    private MovimentacaoEstoqueService movimentacaoService;

    // Endpoint para registrar uma nova movimentacao (Entrada ou Saida)
    // Exemplo de uso: POST /estoque/movimentar
    @PostMapping("/movimentar")

    // Endpoint para listar o historico de movimentacoes de um material
    // Exemplo de uso: GET /estoque/historico/5
    // O número 5 seria o ID do material
    @GetMapping("/historico/{materialId}")
    public List<MovimentacaoEstoque> listarHistorico(@PathVariable Long materialId) {
        return movimentacaoService.listarPorMaterial(materialId);
    }

    // Endpoint para listar o histórico de movimentações usando o código interno
    // GET /estoque/historico/codigo/MAT-001
    @GetMapping("/historico/codigo/{codigoInterno}")
    public List<MovimentacaoEstoque> listarHistoricoPorCodigoInterno(@PathVariable String codigoInterno) {
        return movimentacaoService.listarPorCodigoInterno(codigoInterno);
    }

}

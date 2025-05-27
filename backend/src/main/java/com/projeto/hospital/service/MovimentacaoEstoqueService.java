
package com.projeto.hospital.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Material;
import com.projeto.hospital.entity.MovimentacaoEstoque;
import com.projeto.hospital.entity.TipoMovimentacao;
import com.projeto.hospital.repository.MaterialRepository;
import com.projeto.hospital.repository.MovimentacaoEstoqueRepository;

@Service
public class MovimentacaoEstoqueService {

    @Autowired
    private MovimentacaoEstoqueRepository movimentacaoRepository;

    @Autowired
    private MaterialRepository materialRepository;

    // Registra uma entrada ou saída de material
    public MovimentacaoEstoque registrarMovimentacao(MovimentacaoEstoque movimentacao) {
        // Recupera o material completo do banco, com base no ID recebido na
        // movimentação
        Material material = materialRepository.findById(movimentacao.getMaterial().getId())
                .orElseThrow(() -> new RuntimeException("Material não encontrado"));

        // Armazena a quantidade atual do material no estoque antes da movimentação
        int quantidadeAtual = material.getQuantidadeAtual();

        // Armazena a quantidade informada na movimentação (entrada ou saída)
        int quantidadeMovimentada = movimentacao.getQuantidade();

        if (movimentacao.getTipo() == TipoMovimentacao.ENTRADA) {
            // Entrada: aumenta a quantidade atual
            material.setQuantidadeAtual(quantidadeAtual + quantidadeMovimentada);
        } else if (movimentacao.getTipo() == TipoMovimentacao.SAIDA) {
            // Saída: verifica se tem estoque suficiente
            if (quantidadeMovimentada > quantidadeAtual) {
                throw new RuntimeException("Quantidade insuficiente em estoque");
            }
            material.setQuantidadeAtual(quantidadeAtual - quantidadeMovimentada);
        } else {
            throw new RuntimeException("Tipo de movimentação inválido (use ENTRADA ou SAIDA)");
        }

        // Atualiza a data/hora da movimentação
        movimentacao.setDataHora(LocalDateTime.now());

        // Garante que o material usado é o mais atualizado
        movimentacao.setMaterial(materialRepository.save(material));

        // Salva a movimentação no histórico
        return movimentacaoRepository.save(movimentacao);
    }

    // Retorna o historico de movimentacoes para um material
    public List<MovimentacaoEstoque> listarPorMaterial(Long materialId) {
        return movimentacaoRepository.findByMaterialId(materialId);
    }

    // Retorna o histórico de movimentações com base no código interno do material
    public List<MovimentacaoEstoque> listarPorCodigoInterno(String codigoInterno) {
        Material material = materialRepository.findByCodigoInterno(codigoInterno)
                .orElseThrow(() -> new RuntimeException("Material com esse código interno não encontrado"));

        return movimentacaoRepository.findByMaterialId(material.getId());
    }

}

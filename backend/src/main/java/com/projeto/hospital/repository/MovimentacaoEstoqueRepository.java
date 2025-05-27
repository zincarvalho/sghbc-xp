
package com.projeto.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.hospital.entity.MovimentacaoEstoque;

public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Long> {

    // Retorna o historico de movimentacoes de um material especifico
    List<MovimentacaoEstoque> findByMaterialId(Long materialId);
}

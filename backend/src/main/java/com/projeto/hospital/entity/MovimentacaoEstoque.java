package com.projeto.hospital.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Entidade que representa uma movimentacao de estoque (entrada ou saida)
@Entity
public class MovimentacaoEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tipo da movimentacao: "Entrada" ou "Saida"
    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipo;

    // Quantidade movimentada
    @NotNull(message = "A quantidade e obrigatoria")
    @Min(value = 1, message = "A quantidade deve ser maior que zero")
    private Integer quantidade;

    // Motivo da entrada ou saida (ex: reposicao, ajuste, uso, etc.)
    @NotBlank(message = "O motivo é obrigatório")
    private String motivo;

    // Material relacionado a movimentacao
    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

}

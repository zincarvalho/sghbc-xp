
package com.projeto.hospital.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity

public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do material é obrigatório")
    private String nome;

    // Codigo interno do material (pode ser inserido manualmente ou gerado pelo
    // sistema).
    // Esse codigo NAO e o ID gerado automaticamente pelo banco (que e o campo
    // 'id').
    // Ele serve como um identificador proprio do material (ex: "MAT-001",
    // "AGL-202", etc),
    // podendo ser exibido no sistema, impresso em etiquetas ou usado na busca.
    // Esta marcado como unico para evitar duplicatas.

    @NotBlank(message = "O código interno é obrigatório")
    @Column(unique = true)
    private String codigoInterno;

    @NotBlank(message = "A categoria é obrigatória")
    private String categoria;

    @NotNull(message = "A quantidade atual deve ser informada")
    @Min(value = 0, message = "A quantidade atual não pode ser negativa")
    private Integer quantidadeAtual;

    @NotNull(message = "O estoque mínimo deve ser informado")
    @Min(value = 0, message = "O estoque mínimo não pode ser negativo")
    private Integer estoqueMinimo;

    @Enumerated(EnumType.STRING)
    private UnidadeMedida unidadeDeMedida;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigoInterno() {
        return codigoInterno;
    }

    public void setCodigoInterno(String codigoInterno) {
        this.codigoInterno = codigoInterno;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Integer getEstoqueMinimo() {
        return estoqueMinimo;
    }

    public void setEstoqueMinimo(Integer estoqueMinimo) {
        this.estoqueMinimo = estoqueMinimo;
    }

    public UnidadeMedida getUnidadeDeMedida() {
        return unidadeDeMedida;
    }

    public void setUnidadeDeMedida(UnidadeMedida unidadeDeMedida) {
        this.unidadeDeMedida = unidadeDeMedida;
    }
}
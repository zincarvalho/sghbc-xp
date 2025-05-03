package com.projeto.hospital.entity;

import org.hibernate.validator.constraints.br.CNPJ;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

import java.util.Objects;

// @Data // Removed Lombok @Data
// @NoArgsConstructor // Removed Lombok @NoArgsConstructor
// @AllArgsConstructor // Removed Lombok @AllArgsConstructor
@Entity
@Table(name = "convenio")
public class Convenio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_convenio")
    private Integer id;

    @NotBlank(message = "CNPJ é obrigatório")
    @CNPJ(message = "CNPJ inválido")
    @Column(name = "cnpj", nullable = false, unique = true)
    private String cnpj;

    @NotBlank(message = "Nome é obrigatório")
    @Column(name = "nome", nullable = false)
    private String nome;

    // Constructors (Manual)
    public Convenio() {
    }

    public Convenio(Integer id, String cnpj, String nome) {
        this.id = id;
        this.cnpj = cnpj;
        this.nome = nome;
    }

    // Getters and Setters (Manual)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // equals and hashCode (Manual)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Convenio convenio = (Convenio) o;
        return Objects.equals(id, convenio.id) && Objects.equals(cnpj, convenio.cnpj);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cnpj);
    }

    // toString (Manual - optional, adjust as needed)
    @Override
    public String toString() {
        return "Convenio{" +
                "id=" + id +
                ", nome=\'" + nome + "\'" +
                ", cnpj=\'" + cnpj + "\'" +
                '}';
    }
}

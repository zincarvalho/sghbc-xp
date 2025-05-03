package com.projeto.hospital.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "especialidade")
public class Especialidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_especialidade")
    private Integer id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    // Constructors
    public Especialidade() {
    }

    public Especialidade(Integer id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Especialidade that = (Especialidade) o;
        return Objects.equals(id, that.id) && Objects.equals(nome, that.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome);
    }

    @Override
    public String toString() {
        return "Especialidade{" +
                "id=" + id +
                ", nome=\'" + nome + "\\'" +
                '}';
    }
}

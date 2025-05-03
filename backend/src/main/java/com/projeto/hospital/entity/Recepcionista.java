package com.projeto.hospital.entity;

import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

import java.util.Objects;

// @Data // Removed Lombok @Data
// @NoArgsConstructor // Removed Lombok @NoArgsConstructor
// @AllArgsConstructor // Removed Lombok @AllArgsConstructor
@Entity
@Table(name = "recepcionista")
public class Recepcionista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recepcionista")
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "cpf", nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(name = "telefone1", nullable = false, length = 20)
    private String telefone1;

    @Column(name = "telefone2", length = 20)
    private String telefone2;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // Constructors (Manual)
    public Recepcionista() {
    }

    public Recepcionista(Integer id, String nome, String cpf, String telefone1, String telefone2, String email) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.email = email;
    }

    // Getters and Setters (Manual)
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone1() {
        return telefone1;
    }

    public void setTelefone1(String telefone1) {
        this.telefone1 = telefone1;
    }

    public String getTelefone2() {
        return telefone2;
    }

    public void setTelefone2(String telefone2) {
        this.telefone2 = telefone2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // equals and hashCode (Manual)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recepcionista that = (Recepcionista) o;
        return Objects.equals(id, that.id) && Objects.equals(cpf, that.cpf) && Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cpf, email);
    }

    // toString (Manual)
    @Override
    public String toString() {
        return "Recepcionista{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

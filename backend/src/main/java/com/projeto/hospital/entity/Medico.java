package com.projeto.hospital.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "medico")
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medico")
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "crm")
    private String crm;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "telefone2")
    private String telefone2;

    @ManyToOne
    @JoinColumn(name = "id_especialidade")
    private Especialidade especialidade;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    // Constructors
    public Medico() {
    }

    public Medico(Integer id, String nome, String crm, String email, String telefone, 
                 String telefone2, Especialidade especialidade, Endereco endereco) {
        this.id = id;
        this.nome = nome;
        this.crm = crm;
        this.email = email;
        this.telefone = telefone;
        this.telefone2 = telefone2;
        this.especialidade = especialidade;
        this.endereco = endereco;
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

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTelefone2() {
        return telefone2;
    }

    public void setTelefone2(String telefone2) {
        this.telefone2 = telefone2;
    }

    public Especialidade getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(Especialidade especialidade) {
        this.especialidade = especialidade;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Medico medico = (Medico) o;
        return Objects.equals(id, medico.id) && Objects.equals(crm, medico.crm);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, crm);
    }

    @Override
    public String toString() {
        return "Medico{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", crm='" + crm + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

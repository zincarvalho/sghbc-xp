package com.projeto.hospital.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "enfermeiro")
public class Enfermeiro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_enfermeiro")
    private Integer id;
    
    @Column(name = "nome", nullable = false)
    private String nome; 
    
    @Column(name = "coren", unique = true)
    private String coren;
    
    @Column(name = "telefone")
    private String telefone;
    
    @Column(name = "email")
    private String email;
    
    // Constructors
    public Enfermeiro() {
    }
    
    public Enfermeiro(Integer id, String nome, String coren, String telefone, String email) {
        this.id = id;
        this.nome = nome;
        this.coren = coren;
        this.telefone = telefone;
        this.email = email;
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
    
    public String getCoren() {
        return coren;
    }
    
    public void setCoren(String coren) {
        this.coren = coren;
    }
    
    public String getTelefone() {
        return telefone;
    }
    
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    // Eualidade e HashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enfermeiro enfermeiro = (Enfermeiro) o;
        return Objects.equals(id, enfermeiro.id) && Objects.equals(coren, enfermeiro.coren);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, coren);
    }
    
    @Override
    public String toString() {
        return "Enfermeiro{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", coren='" + coren + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

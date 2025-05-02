package com.projeto.hospital.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}

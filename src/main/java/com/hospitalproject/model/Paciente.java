package com.hospitalproject.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente")
    private Integer id;

    private String nome;
    private String cpf;
    private String rg;

    @Column(name = "data_nascimento")
    private Date dataNascimento;

    private String sexo;

    private String telefone1;
    private String telefone2;
    private String email;

}
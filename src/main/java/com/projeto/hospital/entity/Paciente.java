package com.projeto.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

import org.hibernate.validator.constraints.br.CPF;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente")
    private Integer id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, message = "Nome deve ter pelo menos 3 caracteres")
    @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ ]+$", message = "Nome Não deve conter caracteres especiais. EX: !@#$%¨&*()")
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @CPF(message = "CPF inválido")
    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @NotBlank(message = "RG é obrigatório")
    @Column(name = "rg", nullable = false, unique = true)
    private String rg;

    @NotNull(message = "Data de nascimento é obrigatória")
    @Past(message = "A data de nascimento deve ser no passado")
    @Column(name = "data_nascimento", nullable = false)
    private Date dataNascimento;

    @NotBlank(message = "Sexo é obrigatório")
    @Column(name = "sexo", nullable = false)
    private String sexo;

    @NotBlank(message = "Telefone é obrigatório")
    @Column(name = "telefone1", nullable = false)
    private String telefone1;

    @Column(name = "telefone2")
    private String telefone2;

    @Email(message = "E-mail inválido")
    private String email;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "id_convenio")
    private Convenio convenio;
}
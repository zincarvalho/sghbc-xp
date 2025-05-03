package com.projeto.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.sql.Date;
import java.util.Objects;

import org.hibernate.validator.constraints.br.CPF;

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

    // Constructors (Manual)
    public Paciente() {
    }

    public Paciente(Integer id, String nome, String cpf, String rg, Date dataNascimento, String sexo, String telefone1, String telefone2, String email, Endereco endereco, Convenio convenio) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.email = email;
        this.endereco = endereco;
        this.convenio = convenio;
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

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
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

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Convenio getConvenio() {
        return convenio;
    }

    public void setConvenio(Convenio convenio) {
        this.convenio = convenio;
    }

    // equals and hashCode (Manual)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Paciente paciente = (Paciente) o;
        return Objects.equals(id, paciente.id) && Objects.equals(cpf, paciente.cpf) && Objects.equals(rg, paciente.rg);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cpf, rg);
    }

    // toString (Manual - optional, adjust as needed)
    @Override
    public String toString() {
        return "Paciente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                // ... add other fields if needed
                '}';
    }
}

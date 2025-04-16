package com.prontuarioeletronico.dto;

import java.time.LocalDate;

public class ConsultaDTO {

    private Long id;
    private String cpfPaciente;
    private String nomePaciente;
    private LocalDate dataConsulta;
    private String especialidade;
    private String medicoResponsavel;
    private String observacoes;

    

    public ConsultaDTO() {
    }

    public ConsultaDTO(Long id, String cpfPaciente, String nomePaciente, LocalDate dataConsulta, String especialidade, String medicoResponsavel, String observacoes) {
        this.id = id;
        this.cpfPaciente = cpfPaciente;
        this.nomePaciente = nomePaciente;
        this.dataConsulta = dataConsulta;
        this.especialidade = especialidade;
        this.medicoResponsavel = medicoResponsavel;
        this.observacoes = observacoes;
    }

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpfPaciente() {
        return cpfPaciente;
    }

    public void setCpfPaciente(String cpfPaciente) {
        this.cpfPaciente = cpfPaciente;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public LocalDate getDataConsulta() {
        return dataConsulta;
    }

    public void setDataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getMedicoResponsavel() {
        return medicoResponsavel;
    }

    public void setMedicoResponsavel(String medicoResponsavel) {
        this.medicoResponsavel = medicoResponsavel;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
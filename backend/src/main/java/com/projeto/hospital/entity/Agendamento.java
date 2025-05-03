package com.projeto.hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_medico", nullable = false)
    private Medico medico;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusAgendamento status; // e.g., AGENDADO, CONFIRMADO, CANCELADO, REALIZADO

    @Column(name = "observacoes")
    private String observacoes;

    // Constructors
    public Agendamento() {
    }

    public Agendamento(Integer id, Paciente paciente, Medico medico, LocalDateTime dataHora, StatusAgendamento status, String observacoes) {
        this.id = id;
        this.paciente = paciente;
        this.medico = medico;
        this.dataHora = dataHora;
        this.status = status;
        this.observacoes = observacoes;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agendamento that = (Agendamento) o;
        return Objects.equals(id, that.id) && Objects.equals(paciente, that.paciente) && Objects.equals(medico, that.medico) && Objects.equals(dataHora, that.dataHora);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, paciente, medico, dataHora);
    }

    @Override
    public String toString() {
        return "Agendamento{" +
                "id=" + id +
                ", paciente=" + (paciente != null ? paciente.getId() : null) +
                ", medico=" + (medico != null ? medico.getId() : null) +
                ", dataHora=" + dataHora +
                ", status=\'" + status + "\\'" +
                '}';
    }
}

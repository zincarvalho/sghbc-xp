package com.projeto.hospital.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exame")
public class Exame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Tipo de exame é obrigatório")
    private String tipo; // Ex: Raio-X, Sangue, Ressonância

    @NotBlank(message = "Descrição do exame é obrigatória")
    private String descricao; // Descrição do exame

    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "Agendado|Realizado|Cancelado", message = "Status inválido. Permitidos: Agendado, Realizado, Cancelado")
    private String status; // Ex: Agendado, Realizado, Cancelado

    @NotNull(message = "Data e hora do exame são obrigatórias")
    @FutureOrPresent(message = "A data e hora do exame não podem ser no passado")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora; // Data e hora do exame

    @NotNull(message = "Paciente é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;
}

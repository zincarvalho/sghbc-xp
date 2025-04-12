package com.projeto.hospital.entity;

import java.time.LocalDateTime;

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
@Table(name = "agendamento")
public class Agendamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_agendamento")
	private Integer id;

	@Column(name = "id_paciente")
	private Paciente paciente;

	@Column(name = "id_medico")
	private Medico medico;

	@Column(name = "data_hora_entrada")
	private LocalDateTime dataHoraEntrada;

	@Column(name = "data_hora_saída")
	private LocalDateTime dataHoraSaida;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusAgendamento status;

	public enum StatusAgendamento {
		Agendado,
		Cancelado,
		Realizado
	}
}

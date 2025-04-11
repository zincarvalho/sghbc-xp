package com.hospitalproject.dto;

import com.hospitalproject.enums.StatusAgendamento;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgendamentoDTO {
    private Integer idAgendamento;
    private String nomePaciente;
    private StatusAgendamento status;
}

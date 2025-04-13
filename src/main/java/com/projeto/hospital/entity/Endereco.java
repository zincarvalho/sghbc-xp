package com.projeto.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "endereco")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Integer id;

    @NotNull(message = "CEP é obrigatório")
    @Column(name = "cep", nullable = false)
    private String cep;

    @NotNull(message = "Rua é obrigatório")
    @Column(name = "rua", nullable = false)
    private String rua;

    @Column(name = "logradouro")
    private String logradouro;

    @NotNull(message = "Numero é obrigatório")
    @Column(name = "numero", nullable = false)
    private String numero;

    @NotNull(message = "Cidade é obrigatório")
    @Column(name = "cidade", nullable = false)
    private String cidade;

    @NotNull(message = "Estado é obrigatório")
    @Column(name = "estado", nullable = false)
    private String estado;

    @NotNull(message = "Bairro é obrigatório")
    @Column(name = "bairro", nullable = false)
    private String bairro;

    @Column(name = "complemento")
    private String complemento;
}
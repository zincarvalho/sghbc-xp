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
@Table(name = "recepcionista")

public class Recepcionista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recepcionista")
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true, length = 14)
    private String cpf;

    private String telefone1;
    private String telefone2;
    private String email;
	
	
	
	

}
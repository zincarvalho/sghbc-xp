package com.projeto.hospital.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class RecepcionistaTest {

    @Test
    public void testCriarRecepcionista() {
        // Arrange
        Recepcionista recepcionista = new Recepcionista();
        recepcionista.setId(1L);
        recepcionista.setNome("Marta Silva");
        recepcionista.setCpf("123.456.789-00");
        recepcionista.setTelefone1("81999999999");
        recepcionista.setTelefone2("81988888888");
        recepcionista.setEmail("marta@hospital.com");

        // Act & Assert
        assertEquals(1L, recepcionista.getId());
        assertEquals("Marta Silva", recepcionista.getNome());
        assertEquals("123.456.789-00", recepcionista.getCpf());
        assertEquals("81999999999", recepcionista.getTelefone1());
        assertEquals("81988888888", recepcionista.getTelefone2());
        assertEquals("marta@hospital.com", recepcionista.getEmail());
    }
}
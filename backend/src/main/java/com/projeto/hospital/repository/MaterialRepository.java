
package com.projeto.hospital.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.hospital.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    // Busca materiais pelo nome OU pelo código interno, ignorando letras
    // maiusculas/minusculas.
    List<Material> findByNomeContainingIgnoreCaseOrCodigoInternoContainingIgnoreCase(String nome, String codigo);

    // Filtra materiais por categoria exata.
    List<Material> findByCategoria(String categoria);

    // Busca um material especifico pelo codigo interno (geralmente unico).
    Optional<Material> findByCodigoInterno(String codigoInterno);

    // Verifira se o material existe antes de salvar.
    boolean existsByNomeIgnoreCaseAndCategoriaIgnoreCase(String nome, String categoria);
}

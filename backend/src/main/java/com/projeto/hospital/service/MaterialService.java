package com.projeto.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Material;
import com.projeto.hospital.repository.MaterialRepository;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    // Cria e salva um novo material no banco de dados
    public Material create(Material material) {

        // Padroniza os campos para evitar inconsistências
        material.setNome(material.getNome().trim());
        material.setCodigoInterno(material.getCodigoInterno().trim().toUpperCase());
        material.setCategoria(material.getCategoria().trim().toUpperCase());

        // Verifica se já existe um material com o mesmo nome e categoria
        boolean exists = materialRepository.existsByNomeIgnoreCaseAndCategoriaIgnoreCase(
                material.getNome(), material.getCategoria());

        if (exists) {
            throw new RuntimeException("Já existe um material com esse nome e categoria.");
        }

        try {
            return materialRepository.save(material);
        } catch (DataIntegrityViolationException e) {
            // Trata erro de duplicidade de código interno (único)
            throw new RuntimeException("Código interno já está em uso.");
        }
    }

    // Retorna todos os materiais do banco de dados, ordenados conforme o criterio
    // informado (ex: por nome ou por codigo)
    public List<Material> findAllOrderedBy(Sort sort) {
        return materialRepository.findAll(sort);
    }

    // Retorna todos os materiais sem aplicar nenhuma ordenacao especifica
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    // Busca um material com base no codigo interno informado (ex: "MAT-001")
    // Retorna um Optional, que pode estar vazio se o material nao for encontrado
    public Optional<Material> findByCodigoInterno(String codigoInterno) {
        return materialRepository.findByCodigoInterno(codigoInterno);
    }

    // Busca um material especifico pelo ID
    public Optional<Material> findById(Long id) {
        return materialRepository.findById(id);
    }

    // Pesquisa materiais pelo nome ou codigo interno
    public List<Material> searchByNomeOrCodigo(String query) {
        return materialRepository.findByNomeContainingIgnoreCaseOrCodigoInternoContainingIgnoreCase(query, query);
    }

    // Filtra materiais por categoria
    public List<Material> filterByCategoria(String categoria) {
        return materialRepository.findByCategoria(categoria);
    }

    // Atualiza os dados de um material existente
    public Material update(Long id, Material updatedMaterial) {
        // Busca o material atual ou lança erro se não existir
        Material existing = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material não encontrado"));

        // Padroniza os campos para evitar inconsistências
        existing.setNome(updatedMaterial.getNome().trim());
        existing.setCategoria(updatedMaterial.getCategoria().trim().toUpperCase());
        existing.setCodigoInterno(updatedMaterial.getCodigoInterno().trim().toUpperCase());
        existing.setEstoqueMinimo(updatedMaterial.getEstoqueMinimo());
        existing.setUnidadeDeMedida(updatedMaterial.getUnidadeDeMedida());

        return materialRepository.save(existing);
    }

}

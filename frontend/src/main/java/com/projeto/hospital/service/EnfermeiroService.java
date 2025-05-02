package com.projeto.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Enfermeiro;
import com.projeto.hospital.repository.EnfermeiroRepository;

@Service
public class EnfermeiroService {

    private final EnfermeiroRepository enfermeiroRepository;
    
    @Autowired
    public EnfermeiroService(EnfermeiroRepository enfermeiroRepository) {
        this.enfermeiroRepository = enfermeiroRepository;
    }
    
    public List<Enfermeiro> listarTodos() {
        return enfermeiroRepository.findAll();
    }
    
    public Optional<Enfermeiro> buscarPorId(Integer id) {
        return enfermeiroRepository.findById(id);
    }
    
    public Optional<Enfermeiro> buscarPorCoren(String coren) {
        return enfermeiroRepository.findByCoren(coren);
    }
    
    public Enfermeiro salvar(Enfermeiro enfermeiro) {
        return enfermeiroRepository.save(enfermeiro);
    }
    
    public void deletar(Integer id) {
        enfermeiroRepository.deleteById(id);
    }
    
    public Enfermeiro atualizar(Integer id, Enfermeiro enfermeiroAtualizado) {
        return enfermeiroRepository.findById(id)
            .map(enfermeiroExistente -> {
                enfermeiroExistente.setNome(enfermeiroAtualizado.getNome());
                enfermeiroExistente.setCoren(enfermeiroAtualizado.getCoren());
                enfermeiroExistente.setTelefone(enfermeiroAtualizado.getTelefone());
                enfermeiroExistente.setEmail(enfermeiroAtualizado.getEmail());
                return enfermeiroRepository.save(enfermeiroExistente);
            })
            .orElseThrow(() -> new RuntimeException("Enfermeiro não encontrado"));
    }
}
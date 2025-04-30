package com.projeto.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projeto.hospital.entity.Recepcionista;
import com.projeto.hospital.repository.RecepcionistaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecepcionistaService {

    private final RecepcionistaRepository recepcionistaRepository;

    @Autowired
    public RecepcionistaService(RecepcionistaRepository recepcionistaRepository) {
        this.recepcionistaRepository = recepcionistaRepository;
    }

    public List<Recepcionista> listarTodos() {
        return recepcionistaRepository.findAll();
    }

    public Optional<Recepcionista> buscarPorId(Integer id) {
        return recepcionistaRepository.findById(id);
    }

    public Optional<Recepcionista> buscarPorCpf(String cpf) {
        return recepcionistaRepository.findByCpf(cpf);
    }

    public Recepcionista salvar(Recepcionista recepcionista) {
        return recepcionistaRepository.save(recepcionista);
    }

    public void deletar(Integer id) {
        recepcionistaRepository.deleteById(id);
    }

    public Recepcionista atualizar(Integer id, Recepcionista recepcionistaAtualizado) {
        return recepcionistaRepository.findById(id)
                .map(recepcionistaExistente -> {
                    recepcionistaExistente.setNome(recepcionistaAtualizado.getNome());
                    recepcionistaExistente.setTelefone1(recepcionistaAtualizado.getTelefone1());
                    recepcionistaExistente.setTelefone2(recepcionistaAtualizado.getTelefone2());
                    recepcionistaExistente.setEmail(recepcionistaAtualizado.getEmail());
                    return recepcionistaRepository.save(recepcionistaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Recepcionista não encontrado"));
    }
}
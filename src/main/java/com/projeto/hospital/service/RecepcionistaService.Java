package com.projeto.hospital.service;

import com.seu_pacote.model.Recepcionista;
import com.seu_pacote.repository.RecepcionistaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class RecepcionistaService {

    
    private final RecepcionistaRepository repository;

    public RecepcionistaService(RecepcionistaRepository repository) {
        this.repository = repository;
    }

    public List<Recepcionista> listarTodos() {
        return repository.findAll();
    }

    public Optional<Recepcionista> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Recepcionista salvar(Recepcionista recepcionista) {
        return repository.save(recepcionista);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}

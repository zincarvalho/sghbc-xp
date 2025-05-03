package com.projeto.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projeto.hospital.entity.Especialidade;
import com.projeto.hospital.repository.EspecialidadeRepository;
import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadeService {

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    public Especialidade salvar(Especialidade especialidade) {
        return especialidadeRepository.save(especialidade);
    }

    public List<Especialidade> listarTodos() {
        return especialidadeRepository.findAll();
    }

    public Optional<Especialidade> buscarPorId(Integer id) {
        return especialidadeRepository.findById(id);
    }

    public void deletar(Integer id) {
        especialidadeRepository.deleteById(id);
    }

    public Especialidade atualizar(Integer id, Especialidade especialidadeAtualizada) {
        if (especialidadeRepository.existsById(id)) {
            especialidadeAtualizada.setId(id);
            return especialidadeRepository.save(especialidadeAtualizada);
        }
        return null; // or throw an exception
    }
}


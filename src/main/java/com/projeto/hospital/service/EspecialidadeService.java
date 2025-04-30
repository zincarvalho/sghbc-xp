package com.projeto.hospital.service;

import com.projeto.hospital.entity.Especialidade;
import com.projeto.hospital.repository.EspecialidadeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadeService {

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    public List<Especialidade> listarTodos() {
        return especialidadeRepository.findAll();
    }

    public Optional<Especialidade> buscarPorId(Integer id) {
        return especialidadeRepository.findById(id);
    }

    public Especialidade salvar(Especialidade Especialidade) {
        return especialidadeRepository.save(Especialidade);
    }

    public Optional<Especialidade> atualizar(Integer id, Especialidade dadosAtualizados) {
        return especialidadeRepository.findById(id).map(Especialidade -> {
            Especialidade.setTipo_especialidade(dadosAtualizados.getTipo_especialidade());
            return especialidadeRepository.save(Especialidade);
        });
    }

    public boolean deletar(Integer id) {
        if (especialidadeRepository.existsById(id)) {
            especialidadeRepository.deleteById(id);
            return true;
        }
        return false;
    }

}

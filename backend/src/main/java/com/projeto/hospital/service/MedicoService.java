package com.projeto.hospital.service;

import com.projeto.hospital.entity.Medico;
import com.projeto.hospital.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> buscarPorId(Integer id) {
        return medicoRepository.findById(id);
    }

    public Medico salvar(Medico medico) {
        return medicoRepository.save(medico);
    }

    public Optional<Medico> atualizar(Integer id, Medico dadosAtualizados) {
        return medicoRepository.findById(id).map(medico -> {
            medico.setNome(dadosAtualizados.getNome());
            medico.setCrm(dadosAtualizados.getCrm());
            medico.setEmail(dadosAtualizados.getEmail());
            medico.setTelefone(dadosAtualizados.getTelefone());
            medico.setTelefone2(dadosAtualizados.getTelefone2());
            medico.setEspecialidade(dadosAtualizados.getEspecialidade());
            medico.setEndereco(dadosAtualizados.getEndereco());
            return medicoRepository.save(medico);
        });
    }

    public boolean deletar(Integer id) {
        if (medicoRepository.existsById(id)) {
            medicoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

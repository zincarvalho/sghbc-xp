package com.projeto.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Convenio;
import com.projeto.hospital.repository.ConvenioRepository;
import com.projeto.hospital.repository.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ConvenioService {

    @Autowired
    private ConvenioRepository convenioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public Convenio salvar(Convenio convenio) {
        Optional<Convenio> existente = convenioRepository.findByCnpj(convenio.getCnpj());
        if (existente.isPresent()) {
            return existente.get();
        }
        return convenioRepository.save(convenio);
    }

    public List<Convenio> listarTodos() {
        return convenioRepository.findAll();
    }

    public Optional<Convenio> buscarPorId(Integer id) {
        return convenioRepository.findById(id);
    }

    public Convenio atualizar(Integer id, Convenio convenioAtualizado) {
        Convenio convenioExistente = buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Convênio não encontrado"));

        convenioExistente.setNome(convenioAtualizado.getNome());
        convenioExistente.setCnpj(convenioAtualizado.getCnpj());

        return convenioRepository.save(convenioExistente);
    }

    public void deletar(Integer id) {
        if (!convenioRepository.existsById(id)) {
            throw new IllegalArgumentException("Convênio não encontrado com ID: " + id);
        }

        if (!pacienteRepository.findByConvenioId(id).isEmpty()) {
            throw new IllegalStateException("Não é possível excluir o convênio: existem pacientes vinculados.");
        }

        convenioRepository.deleteById(id);
    }
}

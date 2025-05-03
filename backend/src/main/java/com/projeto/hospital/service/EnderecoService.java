package com.projeto.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Endereco;
import com.projeto.hospital.repository.EnderecoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Endereco salvar(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public List<Endereco> listarTodos() {
        return enderecoRepository.findAll();
    }

    public Optional<Endereco> buscarPorId(Integer id) {
        return enderecoRepository.findById(id);
    }

    public void deletar(Integer id) {
        enderecoRepository.deleteById(id);
    }

    public Endereco atualizar(Integer id, Endereco enderecoAtualizado) {
        Endereco enderecoExistente = buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        enderecoExistente.setCep(enderecoAtualizado.getCep());
        enderecoExistente.setLogradouro(enderecoAtualizado.getLogradouro());
        enderecoExistente.setNumero(enderecoAtualizado.getNumero());
        enderecoExistente.setBairro(enderecoAtualizado.getBairro());
        enderecoExistente.setCidade(enderecoAtualizado.getCidade());
        enderecoExistente.setEstado(enderecoAtualizado.getEstado());

        return enderecoRepository.save(enderecoExistente);
    }
}

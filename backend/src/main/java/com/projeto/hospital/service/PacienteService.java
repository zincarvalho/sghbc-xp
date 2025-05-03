package com.projeto.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.projeto.hospital.entity.Endereco;
import com.projeto.hospital.entity.Paciente;
import com.projeto.hospital.repository.ConvenioRepository;
import com.projeto.hospital.repository.EnderecoRepository;
import com.projeto.hospital.repository.PacienteRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ConvenioRepository convenioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Paciente salvar(Paciente paciente) {
        try {
            if (paciente.getEndereco() == null) {
                throw new IllegalArgumentException("Endereço é obrigatório.");
            } else if (paciente.getEndereco().getId() != null) {
                if (!enderecoRepository.existsById(paciente.getEndereco().getId())) {
                    throw new IllegalArgumentException("Endereço informado não existe.");
                }
            } else {
                Endereco enderecoInformado = paciente.getEndereco();
                Optional<Endereco> existente = enderecoRepository.findAll().stream()
                        .filter(e -> Objects.equals(e.getCep(), enderecoInformado.getCep()) &&
                                Objects.equals(e.getLogradouro(), enderecoInformado.getLogradouro()) &&
                                Objects.equals(e.getNumero(), enderecoInformado.getNumero()) &&
                                Objects.equals(e.getBairro(), enderecoInformado.getBairro()) &&
                                Objects.equals(e.getCidade(), enderecoInformado.getCidade()) &&
                                Objects.equals(e.getEstado(), enderecoInformado.getEstado()))
                        .findFirst();

                if (existente.isPresent()) {
                    paciente.setEndereco(existente.get());
                } else {
                    Endereco novoEndereco = enderecoRepository.save(enderecoInformado);
                    paciente.setEndereco(novoEndereco);
                }
            }

            if (paciente.getConvenio() != null) {
                if (paciente.getConvenio().getId() == null ||
                        !convenioRepository.existsById(paciente.getConvenio().getId())) {
                    throw new IllegalArgumentException("Convênio informado não existe.");
                }
            }

            return pacienteRepository.save(paciente);
        } catch (DataIntegrityViolationException e) {
            String mensagemErro = e.getMostSpecificCause().getMessage();

            if (mensagemErro.contains("cpf")) {
                throw new IllegalArgumentException("CPF já cadastrado no sistema.");
            } else if (mensagemErro.contains("rg")) {
                throw new IllegalArgumentException("RG já cadastrado no sistema.");
            } else {
                throw new IllegalArgumentException("Erro ao salvar paciente: dados duplicados ou inválidos.");
            }
        }
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public List<Paciente> buscarPorNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Optional<Paciente> buscarPorCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf);
    }

    public List<Paciente> buscarPorCidade(String cidade) {
        return pacienteRepository.findByCidade(cidade);
    }

    public Optional<Paciente> buscarPorId(Integer id) {
        return pacienteRepository.findById(id);
    }

    public Paciente atualizar(Integer id, Paciente pacienteAtualizado) {
        Optional<Paciente> existenteOpt = pacienteRepository.findById(id);
        if (existenteOpt.isEmpty()) {
            throw new IllegalArgumentException("Paciente não encontrado com o ID: " + id);
        }

        Paciente existente = existenteOpt.get();

        existente.setNome(pacienteAtualizado.getNome());
        existente.setCpf(pacienteAtualizado.getCpf());
        existente.setRg(pacienteAtualizado.getRg());
        existente.setSexo(pacienteAtualizado.getSexo());
        existente.setEmail(pacienteAtualizado.getEmail());
        existente.setTelefone1(pacienteAtualizado.getTelefone1());
        existente.setTelefone2(pacienteAtualizado.getTelefone2());
        existente.setDataNascimento(pacienteAtualizado.getDataNascimento());
        existente.setEndereco(pacienteAtualizado.getEndereco());
        existente.setConvenio(pacienteAtualizado.getConvenio());

        return pacienteRepository.save(existente);
    }

    public void deletar(Integer id) {
        pacienteRepository.deleteById(id);
    }
}

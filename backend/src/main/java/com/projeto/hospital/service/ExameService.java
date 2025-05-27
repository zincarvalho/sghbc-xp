package com.projeto.hospital.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.hospital.entity.Exame;
import com.projeto.hospital.repository.ExameRepository;

@Service
public class ExameService {

  @Autowired
  private ExameRepository exameRepository;

  public Exame salvar(Exame exame) {
    return exameRepository.save(exame);
  }

  public List<Exame> listarTodos() {
    return exameRepository.findAll();
  }

  public List<Exame> buscarTodos() {
    return exameRepository.findAll();
  }

  public List<Exame> buscarPorTipo(String tipo) {
    return exameRepository.findByTipoContainingIgnoreCase(tipo);
  }

  public List<Exame> buscarPorStatus(String status) {
    return exameRepository.findByStatusContainingIgnoreCase(status);
  }

  public List<Exame> buscarPorData(LocalDate data) {
    LocalDateTime inicio = data.atStartOfDay();
    LocalDateTime fim = data.atTime(LocalTime.MAX);
    return exameRepository.findByDataHoraBetween(inicio, fim);
  }

  public List<Exame> buscarTodosOrdenadoPorData() {
    List<Exame> exames = exameRepository.findAll();
    exames.sort(Comparator.comparing(Exame::getDataHora));
    return exames;
  }

  public List<Exame> buscarPorNomePaciente(String nomePaciente) {
    if (nomePaciente == null) {
      return List.of();
    }
    List<Exame> exames = exameRepository.findByPacienteNomeContainingIgnoreCase(nomePaciente.trim());

    exames.sort(Comparator.comparing(Exame::getDataHora));

    return exames;
  }

  public List<Exame> buscarPorCpfPaciente(String cpf) {
    // Remover pontos e traço
    String cpfLimpo = cpf.replaceAll("[^0-9]", "");

    List<Exame> exames = exameRepository.findByCpfPaciente(cpfLimpo);

    if (exames.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum exame encontrado para o CPF informado.");
    }

    return exames;
  }

  public Optional<Exame> buscarPorId(Integer id) {
    return exameRepository.findById(id);
  }

  public Exame atualizar(Integer id, Exame exameAtualizado) {
    Exame exameExistente = buscarPorId(id)
        .orElseThrow(() -> new RuntimeException("Exame não encontrado"));

    // Validar campos obrigatórios manualmente
    if (exameAtualizado.getTipo() == null || exameAtualizado.getTipo().isBlank()) {
      throw new IllegalArgumentException("Tipo de exame é obrigatório");
    }

    if (exameAtualizado.getDescricao() == null || exameAtualizado.getDescricao().isBlank()) {
      throw new IllegalArgumentException("Descrição do exame é obrigatória");
    }

    if (exameAtualizado.getStatus() == null ||
        !(exameAtualizado.getStatus().equals("Agendado") ||
            exameAtualizado.getStatus().equals("Realizado") ||
            exameAtualizado.getStatus().equals("Cancelado"))) {
      throw new IllegalArgumentException("Status inválido. Permitidos: Agendado, Realizado, Cancelado");
    }

    if (exameAtualizado.getDataHora() == null || exameAtualizado.getDataHora().isBefore(LocalDateTime.now())) {
      throw new IllegalArgumentException("Data e hora do exame não podem ser no passado");
    }

    if (exameAtualizado.getPaciente() == null || exameAtualizado.getPaciente().getId() == null) {
      throw new IllegalArgumentException("Paciente é obrigatório");
    }

    // Atualizar campos
    exameExistente.setTipo(exameAtualizado.getTipo());
    exameExistente.setDescricao(exameAtualizado.getDescricao());
    exameExistente.setStatus(exameAtualizado.getStatus());
    exameExistente.setDataHora(exameAtualizado.getDataHora());
    exameExistente.setPaciente(exameAtualizado.getPaciente());

    return exameRepository.save(exameExistente);
  }

  public void remover(Integer id) {
    exameRepository.deleteById(id);
  }
}
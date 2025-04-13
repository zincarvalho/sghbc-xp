package com.projeto.hospital.repository;

import com.projeto.hospital.entity.Endereco;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
  Optional<Endereco> findByCepAndLogradouroAndNumeroAndBairroAndCidadeAndEstado(
      String cep,
      String logradouro,
      String numero,
      String bairro,
      String cidade,
      String estado);
}

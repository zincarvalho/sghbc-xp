package com.projeto.hospital.repository;

import com.projeto.hospital.entity.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ConvenioRepository extends JpaRepository<Convenio, Integer> {
  Optional<Convenio> findByCnpj(String cnpj);
}

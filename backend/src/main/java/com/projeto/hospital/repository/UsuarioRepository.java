package com.projeto.hospital.repository;

import com.projeto.hospital.entity.Usuario;
import com.projeto.hospital.entity.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Método correto para buscar usuários com um perfil específico
    @Query("SELECT u FROM Usuario u JOIN u.perfis p WHERE p = :perfil")
    List<Usuario> findByPerfil(@Param("perfil") Perfil perfil);

    // Outra opção, se quiser um único usuário ADMIN:
    Optional<Usuario> findFirstByPerfisContaining(Perfil perfil);

    Optional<Usuario> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}


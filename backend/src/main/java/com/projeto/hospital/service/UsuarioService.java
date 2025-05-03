package com.projeto.hospital.service;

import com.projeto.hospital.entity.Usuario;
import com.projeto.hospital.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario salvar(Usuario usuario) {
        // Encode password before saving
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        // TODO: Add logic to assign default role if none provided, handle existing
        // users, etc.
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // Add other necessary methods as needed (e.g., findById, listAll, delete,
    // update)
}

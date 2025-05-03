package com.projeto.hospital.config;

import com.projeto.hospital.entity.Usuario;
import com.projeto.hospital.entity.Perfil;
import com.projeto.hospital.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Verificando a existência de usuário ADMIN...");
        if (usuarioRepository.findByPerfil(Perfil.ADMIN).isEmpty()) {
            log.info("Nenhum usuário ADMIN encontrado. Criando usuário padrão...");
            Usuario adminUser = new Usuario();
            adminUser.setUsername("admin");
            // Definindo uma senha padrão. **IMPORTANTE**: Mudar isso em produção!
            adminUser.setPassword(passwordEncoder.encode("admin123")); 
            adminUser.adicionarPerfil(Perfil.ADMIN);
            adminUser.setNomeCompleto("Administrador Padrão");
            adminUser.setEmail("admin@hospital.com"); // Adicionando email padrão
            // Definir outros campos obrigatórios se houver 
            
            usuarioRepository.save(adminUser);
            log.info("Usuário ADMIN padrão criado com sucesso. Username: admin, Senha: admin123");
        } else {
            log.info("Usuário ADMIN já existe. Nenhuma ação necessária.");
        }
    }
}


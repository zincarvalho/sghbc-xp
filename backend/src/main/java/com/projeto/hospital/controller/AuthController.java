package com.projeto.hospital.controller;

import com.projeto.hospital.entity.Usuario;
import com.projeto.hospital.security.JwtTokenProvider;
import com.projeto.hospital.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication.getName());
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", userDetails.getUsername());
        response.put("roles", userDetails.getAuthorities());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
        if (usuarioService.existsByUsername(usuario.getUsername())) {
            return new ResponseEntity<>("Username já está em uso!", HttpStatus.BAD_REQUEST);
        }

        if (usuarioService.existsByEmail(usuario.getEmail())) {
            return new ResponseEntity<>("Email já está em uso!", HttpStatus.BAD_REQUEST);
        }

        Usuario novoUsuario = usuarioService.salvar(usuario);
        return new ResponseEntity<>("Usuário registrado com sucesso!", HttpStatus.CREATED);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshRequest) {
        // Verificar se o token é válido
        if (!tokenProvider.validateToken(refreshRequest.getToken())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido ou expirado");
        }
        
        // Extrair username do token
        String username = tokenProvider.getUsernameFromToken(refreshRequest.getToken());
        
        // Gerar novo token
        String newToken = tokenProvider.generateToken(username);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", newToken);
        
        return ResponseEntity.ok(response);
    }
    
    // Classes internas para as requisições
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
    
    public static class RefreshTokenRequest {
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}

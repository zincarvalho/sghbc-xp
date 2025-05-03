package com.projeto.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import com.projeto.hospital.entity.Perfil;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id;

    @NotBlank(message = "Nome de usuário é obrigatório")
    @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Senha é obrigatória")
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @Column(name = "ultimo_acesso")
    private LocalDateTime ultimoAcesso;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "usuario_perfil", joinColumns = @JoinColumn(name = "id_usuario"))
    @Enumerated(EnumType.STRING)
    @Column(name = "perfil")
    private Set<Perfil> perfis = new HashSet<>();


    public void adicionarPerfilPadrao() {
        if (perfis.isEmpty()) {
            perfis.add(Perfil.PACIENTE); // Define um perfil padrão se não houver um
        }
    }
    
    // Constructors
    public Usuario() {
    }

    public Usuario(Integer id, String username, String password, String email, String nomeCompleto, 
                  LocalDateTime ultimoAcesso, Boolean ativo, LocalDateTime dataCriacao, Set<Perfil> perfis) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.nomeCompleto = nomeCompleto;
        this.ultimoAcesso = ultimoAcesso;
        this.ativo = ativo;
        this.dataCriacao = dataCriacao;
        this.perfis = perfis;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public LocalDateTime getUltimoAcesso() {
        return ultimoAcesso;
    }

    public void setUltimoAcesso(LocalDateTime ultimoAcesso) {
        this.ultimoAcesso = ultimoAcesso;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<Perfil> getPerfis() {
        return perfis;
    }


    public void setPerfis(Set<Perfil> perfis) {
        this.perfis = perfis;
    }
    
    // Método para adicionar perfil
    public void adicionarPerfil(Perfil perfil) {
        if (perfis == null) {
            perfis = new HashSet<>();
        }
        perfis.add(perfil);
    }
    
    // Método para remover perfil
    public void removerPerfil(Perfil perfil) {
        perfis.remove(perfil);
    }
    
    // Método para verificar se possui determinado perfil
    public boolean possuiPerfil(Perfil perfil) {
        return perfis.contains(perfil);
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(username, usuario.username) && Objects.equals(email, usuario.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email);
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", nomeCompleto='" + nomeCompleto + '\'' +
                ", ativo=" + ativo +
                ", perfis=" + perfis +
                '}';
    }
}

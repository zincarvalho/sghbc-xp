# Projeto SGHBC-XP - Sistema de Gestão Hospitalar

## 1. Visão Geral do Projeto

O SGHBC-XP é um Sistema de Gestão Hospitalar desenvolvido para otimizar e automatizar diversos processos dentro de uma instituição de saúde. O sistema visa facilitar a administração de pacientes, equipe médica, agendamentos e outras operações essenciais, proporcionando uma interface intuitiva e segura para diferentes níveis de usuários.

Este projeto foi desenvolvido utilizando tecnologias modernas e práticas de desenvolvimento ágil, focando na modularidade, escalabilidade e manutenibilidade.

## 2. Arquitetura

O sistema segue uma arquitetura cliente-servidor, composta por um backend robusto e um frontend interativo:

- **Backend**: Desenvolvido em Java com o framework Spring Boot. Utiliza Spring Data JPA (com Hibernate) para persistência de dados, Spring Security para autenticação e autorização, e Maven para gerenciamento de dependências e build. O banco de dados configurado para desenvolvimento é o H2 (em memória), mas pode ser facilmente configurado para PostgreSQL ou outro banco relacional para produção.
- **Frontend**: Desenvolvido em JavaScript utilizando a biblioteca React e o framework Vite para build e desenvolvimento rápido. Utiliza Material UI (MUI) para componentização e estilização, React Router para navegação e Axios para comunicação com a API do backend. O gerenciamento de estado de autenticação é feito através do Context API do React.

### Tecnologias Utilizadas:

- **Backend**: Java 17+, Spring Boot 3+, Spring Security, Spring Data JPA, Hibernate, Maven, Lombok, H2 Database, JWT.
- **Frontend**: Node.js 20+, npm, React 18+, Vite, Axios, Material UI (MUI), React Router DOM, date-fns.

## 3. Funcionalidades Implementadas

Até o momento, as seguintes funcionalidades foram implementadas e testadas:

1.  **Autenticação e Autorização**: Mecanismo de login seguro utilizando JWT (JSON Web Tokens). Implementação de diferentes níveis de acesso (perfis/roles) como ADMIN, MEDICO, ENFERMEIRO, RECEPCIONISTA, PACIENTE, etc., com hierarquia de papéis definida via Spring Security.
2.  **Gestão de Pacientes**: CRUD (Create, Read, Update, Delete) completo para pacientes, incluindo busca por nome/CPF e formulários de cadastro/edição.
3.  **Gestão de Médicos**: CRUD completo para médicos, incluindo busca por nome/CRM, seleção de especialidades e formulários de cadastro/edição.
4.  **Gestão de Agendamentos**:
    - Listagem de agendamentos com busca por paciente.
    - Formulário para criação e edição de agendamentos, permitindo selecionar paciente, médico e data/hora.
    - Validação de disponibilidade do médico no backend.
    - Visualização da agenda por médico e data.
    - Cancelamento de agendamentos.

## 4. Configuração e Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento e executar o projeto.

### Pré-requisitos:

- **Java Development Kit (JDK)**: Versão 17 ou superior.
- **Apache Maven**: Versão 3.8 ou superior.
- **Node.js**: Versão 20 ou superior (inclui npm).

### Passos de Instalação:

1.  **Clonar o Repositório** (ou descompactar os arquivos do projeto):

    ```bash
    # Exemplo:
    # git clone <url_do_repositorio>
    # cd sghbc-xp
    ```

    (No ambiente atual, os arquivos já estão presentes em `/home/ubuntu/backend/sghbc-xp` e `/home/ubuntu/frontend/sghbc-xp-front-controle-frequencia`)

2.  **Configurar o Backend**:

    - Navegue até o diretório do backend:
      ```bash
      cd /home/ubuntu/backend/sghbc-xp
      ```
    - Verifique o arquivo `src/main/resources/application.properties`. A configuração padrão utiliza o banco de dados H2 em memória. Para usar PostgreSQL ou outro banco, ajuste as propriedades `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password` e `spring.jpa.database-platform`.
    - Compile o projeto com Maven (opcional, pois o `spring-boot:run` faz isso):
      ```bash
      mvn clean install
      ```

3.  **Configurar o Frontend**:
    - Navegue até o diretório do frontend:
      ```bash
      cd /home/ubuntu/frontend/sghbc-xp-front-controle-frequencia
      ```
    - Instale as dependências do Node.js:
      ```bash
      npm install
      ```
    - Verifique o arquivo `vite.config.js`. Ele contém a configuração do proxy para redirecionar as chamadas de API (`/api`) para o servidor backend. Certifique-se de que a porta no `target` corresponde à porta onde o backend está rodando (padrão 8080 ou 8081, conforme iniciado).

## 5. Executando a Aplicação

1.  **Iniciar o Backend**:

    - No diretório `/home/ubuntu/backend/sghbc-xp`, execute:

      ```bash
      # Para rodar na porta 8080 (padrão)
      mvn spring-boot:run

      # Ou para rodar em outra porta (ex: 8081)
      mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=8081"
      ```

    - O servidor backend estará acessível em `http://localhost:<porta>`.

2.  **Iniciar o Frontend**:
    - No diretório `/home/ubuntu/frontend/sghbc-xp-front-controle-frequencia`, execute:
      ```bash
      npm run dev
      ```
    - O servidor de desenvolvimento Vite iniciará, geralmente na porta 5173 (ou outra, se a 5173 estiver ocupada). A aplicação frontend estará acessível no endereço fornecido no terminal (ex: `http://localhost:5174`).

## 6. Endpoints da API (Principais)

O backend expõe uma API REST para interação com o frontend. Alguns dos principais endpoints são:

- `/api/auth/login`: Autenticação de usuário.
- `/api/auth/register`: Registro de novo usuário (requer permissão).
- `/api/pacientes`: CRUD para pacientes.
- `/api/medicos`: CRUD para médicos.
- `/api/especialidades`: Listagem de especialidades.
- `/api/convenios`: Listagem de convênios.
- `/api/agendamentos`: CRUD para agendamentos.
- `/api/agendamentos/paciente/busca?termo={termo}`: Busca agendamentos por nome/CPF do paciente.
- `/api/agendamentos/medico/{medicoId}/data?data={data}`: Busca agendamentos por médico e data.

_(Consulte os Controllers no código backend para a lista completa e detalhes)_

## 7. Banco de Dados

- **Desenvolvimento**: H2 Database em memória. Os dados são perdidos ao reiniciar o servidor. O console H2 pode ser acessado (se habilitado em `application.properties`) em `http://localhost:<porta>/h2-console`.
- **Produção**: Recomenda-se configurar um banco de dados persistente como PostgreSQL. As configurações de conexão devem ser ajustadas no arquivo `application.properties`.

## 8. Autenticação e Autorização

O sistema utiliza Spring Security com JWT para proteger os endpoints da API.

- **Tokens JWT**: Gerados no login e enviados no header `Authorization: Bearer <token>` em requisições subsequentes.
- **Perfis (Roles)**: Definidos na entidade `Usuario` e no enum `Perfil`. A autorização para acessar diferentes funcionalidades e endpoints é baseada nesses perfis.
- **Hierarquia de Perfis**: Configurada em `RoleHierarchyConfig.java`, permitindo que perfis superiores herdem permissões de perfis inferiores (ex: ADMIN herda permissões de MEDICO, RECEPCIONISTA, etc.).
- **Endpoints Públicos**: `/api/auth/login`.
- **Endpoints Protegidos**: A maioria dos endpoints `/api/**` requer autenticação e autorização adequadas.

---

_Documentação gerada em: Tue Apr 29 2025_

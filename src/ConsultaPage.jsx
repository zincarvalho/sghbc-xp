import React, { useState, useEffect } from "react";
import PopupConsulta from "./PopupConsulta";
import logo from "./logo.svg";

export default function ConsultaPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [atendimentoSelecionado, setAtendimentoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [dados, setDados] = useState([]);

  const abrirPopup = (atendimento) => {
    setAtendimentoSelecionado(atendimento);
    setShowPopup(true);
  };

  const atualizarStatus = (id, novoStatus) => {
    setDados((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: novoStatus } : item
      )
    );
    setShowPopup(false);
  };

  useEffect(() => {
    const mockAPI = [
      {
        id: 1,
        nome: "João Silva",
        cpf: "123.456.789-00",
        consulta: 101,
        status: "Agendado",
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        cpf: "987.654.321-00",
        consulta: 102,
        status: "Realizado",
      },
      {
        id: 3,
        nome: "Carlos Souza",
        cpf: "111.222.333-44",
        consulta: 103,
        status: "Agendado",
      },
      {
        id: 4,
        nome: "Ana Lima",
        cpf: "333.444.555-66",
        consulta: 104,
        status: "Agendado",
      },
      {
        id: 5,
        nome: "Lucas Nunes",
        cpf: "777.888.999-00",
        consulta: 105,
        status: "Cancelado",
      },
      {
        id: 6,
        nome: "Fernanda Melo",
        cpf: "555.666.777-88",
        consulta: 106,
        status: "Realizado",
      },
      {
        id: 7,
        nome: "Paulo Gonçalves",
        cpf: "222.333.444-55",
        consulta: 107,
        status: "Agendado",
      },
      {
        id: 8,
        nome: "Juliana Prado",
        cpf: "999.000.111-22",
        consulta: 108,
        status: "Cancelado",
      },
      {
        id: 9,
        nome: "Bruno Costa",
        cpf: "444.555.666-77",
        consulta: 109,
        status: "Realizado",
      },
      {
        id: 10,
        nome: "Larissa Teixeira",
        cpf: "666.777.888-99",
        consulta: 110,
        status: "Agendado",
      },
    ];
    setDados(mockAPI);
  }, []);

  const resultados = dados.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cpf.includes(busca)
  );

  return (
    <div className="pagina-container">
      <div className="pagina-consulta">
        <div className="topper">
          <div className="top-left">
            <button
              className="top-button"
              onClick={() => window.location.reload()}
            >
              ← {/* <-- alterar para redirecionamento desejado */}
            </button>
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="top-links">
            {/* TODO: Substituir os redirecionamentos quando páginas de Usuário e Logout forem criadas */}
            <a href="/" className="link-usuario">
              Usuário
            </a>
            <a href="/" className="link-logout">
              Logout
            </a>
          </div>
        </div>

        <div className="barra-busca">
          <input
            className="input-busca"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquise pelo Nome ou CPF"
          />
          <button className="botao-buscar">Buscar</button>
        </div>

        <div className="tabela">
          <div className="tabela-header">
            <div>Nome</div>
            <div>N°Consulta</div>
            <div>Status</div>
            <div>Ações</div>
          </div>
          <div className="tabela-linhas">
            {resultados.map((at, index) => (
              <div
                className="tabela-linha"
                key={at.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ECF4FF" : "#FFFFFF",
                }}
              >
                <div>{at.nome}</div>
                <div>{at.consulta}</div>
                <div
                  style={{
                    color: at.status === "Cancelado" ? "red" : "#267ff0",
                    fontWeight: "bold",
                  }}
                >
                  {at.status}
                </div>
                <div>
                  <button
                    className="botao-editar"
                    onClick={() => abrirPopup(at)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPopup && (
          <PopupConsulta
            atendimento={atendimentoSelecionado}
            onClose={() => setShowPopup(false)}
            onStatusChange={atualizarStatus}
          />
        )}
      </div>

      <footer>
        <a href="#">@suporte</a>
      </footer>
    </div>
  );
}

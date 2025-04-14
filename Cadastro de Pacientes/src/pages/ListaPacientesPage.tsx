import { useNavigate } from 'react-router-dom';
import '../styles/ListaPacientesPage.css';

const pacientes = [
  { nome: "Ana Paula Silva", cpf: "123.456.789-00" },
  { nome: "João Marcos Pereira", cpf: "987.654.321-11" },
  { nome: "Letícia Fernandes", cpf: "111.222.333-44" },
  { nome: "Rafael Augusto Lima", cpf: "555.666.777-88" },
  { nome: "Camila Souza Andrade", cpf: "000.999.888-77" },
  { nome: "Pedro Henrique Castro", cpf: "321.654.987-10" },
  { nome: "Mariana Oliveira Costa", cpf: "246.813.579-36" },
  { nome: "Lucas Gabriel Almeida", cpf: "135.792.468-20" },
  { nome: "Juliana Mendes", cpf: "741.852.963-00" },
  { nome: "Carlos Eduardo", cpf: "369.258.147-00" },
  { nome: "Fernanda Braga", cpf: "963.741.258-00" },
];

export default function ListaPacientesPage() {
  const navigate = useNavigate();

  function handleCadastrarClick() {
    navigate('/cadastro');
  }

  return (
    <div className="container">
      <header className="header">
        <img src="/logo.png" alt="Logo SGHBC" className="logo-img" />
        <div className="user-info">
          <button className="user-btn">Usuário</button>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <main>
        <div className="top-bar">
          <button className="add-icon-button" onClick={handleCadastrarClick}>
            <img src="/boneco.png" alt="Cadastrar Pacientes" className="add-icon-only" />
          </button>

          <div id="divBusca">
            <input
              type="text"
              id="txtBusca"
              placeholder="Pesquise por nome ou CPF"
            />
            <button id="btnBusca">Buscar</button>
          </div>
        </div>

        <div className="patient-list">
          <div className="list-header">
            <div>Nome</div>
            <div>CPF</div>
            <div>Ações</div>
          </div>

          <div className="patient-scroll">
            {pacientes.map((p, i) => (
              <div
                className={`patient-item ${i % 2 === 0 ? 'even' : 'odd'}`}
                key={i}
              >
                <div className="patient-name">{p.nome}</div>
                <div>{p.cpf}</div>
                <div className="actions">
                  <button className="action-btn">Editar</button>
                  <button className="action-btn">Agendar</button>
                  <button className="action-btn">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <button className="support-btn">@suporte</button>
      </footer>
    </div>
  );
}

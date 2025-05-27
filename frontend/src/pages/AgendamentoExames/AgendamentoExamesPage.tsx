import { useState } from 'react';

type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  sexo: string;
  dataNascimento: string;
  telefone1: string;
  telefone2: string;
  email: string;
};

export default function AgendamentoExamesPage() {
  const [cpfBusca, setCpfBusca] = useState('');
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [tipoExame, setTipoExame] = useState('');
  const [dataHoraExame, setDataHoraExame] = useState('');
  const [observacoes, setObservacoes] = useState('');

  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  function buscarPaciente() {
    if (!cpfBusca) {
      alert('Digite o CPF antes de buscar!');
      return;
    }

    const cpfFormatado = formatarCPF(cpfBusca);

    fetch(`http://localhost:8080/pacientes/buscar-por-cpf?cpf=${cpfFormatado}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Paciente não encontrado');
        }
        return response.json();
      })
      .then((data) => {
        setPaciente(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Paciente não encontrado ou erro na busca!');
      });
  }

  function salvarExame() {
    if (!paciente) {
      alert('Busque um paciente antes de agendar um exame.');
      return;
    }

    const exame = {
      tipo: tipoExame,
      descricao: observacoes,
      status: 'Agendado',
      dataHora: dataHoraExame,
      paciente: {
        id: paciente.id,
      },
    };

    fetch('http://localhost:8080/exames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exame),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao agendar exame');
        }
        return response.json();
      })
      .then((data) => {
        alert('Exame agendado com sucesso!');
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro ao salvar exame:', error);
        alert('Erro ao agendar exame.');
      });
  }

  return (
    <div className="agendamento-container">
      <header className="agendamento-header">
        <div className="left-header">
          <a href="/">
            <img src="/voltar.png" alt="Voltar" className="icon-back" />
          </a>
          <img src="/logo.png" alt="Logo SGHBC" className="logo-img" />
        </div>
        <div className="user-info">
          <button className="user-btn">Usuário</button>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="agendamento-content">
        <form className="form-layout" onSubmit={(e) => e.preventDefault()}>
          <div className="form-left">
            <h2 className="section-title">AGENDAMENTO DE EXAMES</h2>
            <br />

            <div className="form-group search-block"></div>

            <div className="form-group">
              <input
                id="cpf-search"
                type="text"
                placeholder="Digite o CPF"
                value={cpfBusca}
                onChange={(e) => setCpfBusca(e.target.value)}
              />
              <br />
              <button type="button" className="btn-buscar" onClick={buscarPaciente}>
                Buscar
              </button>
            </div>
            <br />

            <div className="form-group">
              <label>Nome Completo</label>
              <input type="text" value={paciente?.nome || ''} readOnly />
            </div>

            <div className="form-group">
              <label>Sexo</label>
              <input type="text" value={paciente?.sexo || ''} readOnly />
            </div>
            <br />

            <div className="form-group">
              <label>CPF</label>
              <input type="text" value={paciente?.cpf || ''} readOnly />
            </div>

            <div className="form-group">
              <label>Data de Nascimento</label>
              <div className="input-icon">
                <input type="text" value={paciente?.dataNascimento || ''} readOnly />
                <img src="/data.png" alt="Calendário" />
              </div>
            </div>
            <br />

            <div className="form-group">
              <label>Tipo do Exame</label>
              <input type="text" value={tipoExame} onChange={(e) => setTipoExame(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Data e hora do Exame</label>
              <div className="input-icon">
                <input
                  type="datetime-local"
                  value={dataHoraExame}
                  onChange={(e) => setDataHoraExame(e.target.value)}
                />
                <img src="/data.png" alt="Calendário" />
              </div>
            </div>
            <br />

            <div className="form-group">
              <label>Observações</label>
              <textarea
                className="observacoes-textarea"
                rows={3}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="vertical-divider"></div>

          <div className="form-right">
            <h2 className="section-title">MÉDICO SOLICITANTE DO EXAME</h2>

            <div className="form-group">
              <label>Especialidade</label>
              <select defaultValue="">
                <option value="" disabled hidden>
                  Selecione
                </option>
                <option>Cardiologia</option>
                <option>Neurologia</option>
              </select>
            </div>

            <div className="form-group">
              <label>Médico</label>
              <select defaultValue="">
                <option value="" disabled hidden>
                  Selecione
                </option>
                <option>Dr. João</option>
                <option>Dra. Maria</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="button" className="btn-salvar" onClick={salvarExame}>
                Salvar
              </button>
              <button type="button" className="btn-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </main>

      <footer className="footer">
        <button className="support-btn">@suporte</button>
      </footer>
    </div>
  );
}

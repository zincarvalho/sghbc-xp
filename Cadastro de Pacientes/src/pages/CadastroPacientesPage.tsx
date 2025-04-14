import '../styles/CadastroPacientesPage.css';

export default function CadastroPacientesPage() {
  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
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

      <main className="cadastro-content">
        <form className="form-layout">
          <div className="form-left">
            <div className="form-row">
              <h2 className="section-title">CADASTRO DE PACIENTES</h2>
              <br />
              <div className="form-group nome-completo">
                <label>Nome Completo</label>
                <input type="text" />
              </div>
              <div className="form-group sexo">
                <label>Sexo</label>
                <select defaultValue="" required>
                  <option value="" disabled hidden className="placeholder-option">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nome Familiar</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-group">
                <label>Data de Nascimento</label>
                <div className="input-icon">
                  <input type="text" placeholder="Data" />
                  <img src="/data.png" alt="Calendário" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CPF</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={11} placeholder="00000000000" />
              </div>
              <div className="form-group">
                <label>RG</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={9} placeholder="000000000" />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={11} placeholder="(00) 000000000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Telefone 2</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={11} placeholder="(00) 000000000" />
              </div>
              <div className="form-group">
                <label>Telefone Familiar</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={11} placeholder="(00) 000000000" />
              </div>
              <div className="form-group">
                <label>CEP</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={8} placeholder="00000000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cidade</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input type="text" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Logradouro</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={6} />
              </div>
              <div className="form-group complemento">
                <label>Complemento</label>
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="vertical-divider"></div>

          <div className="form-right">
            <h3 className="section-title">CONVÊNIO</h3>
            <div className="form-group">
              <label>Nome</label>
              <select>
                <option>Selecione</option>
              </select>
            </div>
            <div className="form-group">
              <label>CNPJ</label>
              <input type="text" inputMode="numeric" pattern="\d*" maxLength={14} placeholder="00000000000000" />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-salvar">Salvar</button>
              <button type="button" className="btn-cancelar">Cancelar</button>
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

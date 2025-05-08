import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import HistoricoMedicoTab from "../components/TabContent/HistoricoMedicoTab";
import ConsultasTab from "../components/TabContent/ConsultasTab";
import ExamesTab from "../components/TabContent/ExamesTab";
import TratamentosTab from "../components/TabContent/TratamentosTab";
import PopupTratamento from "../components/PopupTratamento";
import userIcon from "../assets/user.svg";

const ProntuarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Histórico Médico");
  const [paciente, setPaciente] = useState<{
    cpf: string;
    nome: string;
    idade: number;
    genero: string;
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [atendimentoSelecionado, setAtendimentoSelecionado] =
    useState<any>(null);

  const handleSearch = (cpf: string) => {
    // Simulação de busca por CPF
    const mockPaciente = {
      cpf: "123.456.789-00",
      nome: "João da Silva",
      idade: 45,
      genero: "Masculino",
    };

    if (cpf === mockPaciente.cpf) {
      setPaciente(mockPaciente);
    } else {
      setPaciente(null);
    }
  };

  const handleStatusChange = (id: string, novoStatus: string) => {
    console.log(`Atendimento ${id} alterado para o status: ${novoStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-inter">
      <Header />
      <main className="flex-grow px-4 md:px-6 xl:px-10 mt-20 py-6">
        <SearchBar onSearch={handleSearch} />

        <div className="mt-4">
          {paciente && (
            <>
              {/* Linha superior personalizada */}
              <hr
                className="border-t my-6"
                style={{ borderColor: "#B3D3FC" }}
              />

              <div className="flex items-center space-x-6">
                {/* Ícone de usuário (maior) */}
                <img
                  src={userIcon}
                  alt="Ícone de usuário"
                  className="w-16 h-16 rounded-full"
                />

                {/* Informações do paciente */}
                <div className="flex flex-col text-sm">
                  <span className="text-base font-semibold">
                    {paciente.nome}
                  </span>
                  <div className="flex space-x-28 text-sm mt-1">
                    <span>{paciente.idade} anos</span>
                    <span>{paciente.genero}</span>
                    <span>{paciente.cpf}</span>
                  </div>
                </div>
              </div>

              {/* Linha inferior personalizada */}
              <hr
                className="border-t my-4"
                style={{ borderColor: "#B3D3FC" }}
              />
            </>
          )}

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-4">
            {activeTab === "Histórico Médico" && paciente && (
              <HistoricoMedicoTab paciente={paciente} />
            )}
            {activeTab === "Consultas" && paciente && (
              <ConsultasTab paciente={paciente} />
            )}
            {activeTab === "Exames" && paciente && (
              <ExamesTab paciente={paciente} />
            )}
            {activeTab === "Tratamentos" && paciente && (
              <TratamentosTab
                paciente={paciente}
                onStatusChange={handleStatusChange}
                setAtendimentoSelecionado={setAtendimentoSelecionado}
                setIsPopupOpen={setIsPopupOpen}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />

      {isPopupOpen && atendimentoSelecionado && (
        <PopupTratamento
          onClose={() => setIsPopupOpen(false)}
          atendimento={atendimentoSelecionado}
        />
      )}
    </div>
  );
};

export default ProntuarioPage;

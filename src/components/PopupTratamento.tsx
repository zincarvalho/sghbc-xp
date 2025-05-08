import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import IconeCheckX from "../assets/IconeCheckX.svg"; // Importando o SVG do X diretamente

interface Atendimento {
  id: string;
  status: string;
  onConfirm: (novoStatus: string) => void;
}

interface PopupTratamentoProps {
  onClose: () => void;
  atendimento: Atendimento;
}

const PopupTratamento: React.FC<PopupTratamentoProps> = ({
  onClose,
  atendimento,
}) => {
  const [statusSelecionado, setStatusSelecionado] = useState(
    atendimento.status
  );

  const opcoes = [
    { label: "Em andamento", color: "#267FF0" },
    { label: "Concluído", color: "#267FF0" },
    { label: "Interrompido", color: "#B40000" },
  ];

  const handleChange = (novoStatus: string) => {
    setStatusSelecionado(novoStatus);
    if (novoStatus !== atendimento.status) {
      atendimento.onConfirm(novoStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[480px] border border-gray-300">
        {/* Cabeçalho */}
        <div className="bg-[#ECF4FF] px-6 py-3 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-black text-3xl font-bold focus:outline-none"
          >
            ←
          </button>
          <img src={Logo} alt="Logo" className="h-20" />
        </div>

        {/* Corpo */}
        <div className="flex flex-col items-start px-10 pt-20 pb-16 space-y-10 font-bold text-lg min-h-[450px]">
          {opcoes.map((opcao) => (
            <label
              key={opcao.label}
              className="flex items-center space-x-4 cursor-pointer"
              style={{ color: opcao.color }}
              onClick={() => handleChange(opcao.label)}
            >
              <span className="w-6 h-6 border-2 border-black inline-block">
                {statusSelecionado === opcao.label && (
                  <img
                    src={IconeCheckX}
                    alt="X"
                    className="w-6 h-6" // Definindo o tamanho do ícone X
                  />
                )}
              </span>
              <span className="font-bold">{opcao.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupTratamento;

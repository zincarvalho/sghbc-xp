import React, { useEffect, useState } from "react";

interface Paciente {
  cpf: string;
  nome: string;
  idade: number;
  genero: string;
}

interface Tratamento {
  id: string;
  nome: string;
  data: string;
  dosagem: string;
  status: string;
}

interface TratamentosTabProps {
  paciente: Paciente | null;
  onStatusChange: (id: string, novoStatus: string) => void;
  setAtendimentoSelecionado: (atendimento: any) => void;
  setIsPopupOpen: (isOpen: boolean) => void;
}

const TratamentosTab: React.FC<TratamentosTabProps> = ({
  paciente,
  onStatusChange,
  setAtendimentoSelecionado,
  setIsPopupOpen,
}) => {
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  useEffect(() => {
    // Inicializa com os dados mock apenas uma vez
    setTratamentos([
      {
        id: "1",
        nome: "Tratamento com Metformina",
        data: "14/04/2025",
        dosagem: "850 mg 2x/dia",
        status: "Em andamento",
      },
      {
        id: "2",
        nome: "Tratamento com Losartana",
        data: "20/02/2025",
        dosagem: "50 mg/dia",
        status: "Concluído",
      },
      {
        id: "3",
        nome: "Sessões de fisioterapia",
        data: "23/01/2025",
        dosagem: "3x por semana",
        status: "Interrompido",
      },
      {
        id: "4",
        nome: "Acompanhamento Pós-Cirúrgico",
        data: "20/05/2025",
        dosagem: "1x por semana",
        status: "Interrompido",
      },
      {
        id: "5",
        nome: "Terapia Nutricional",
        data: "30/05/2025",
        dosagem: "2x ao dia",
        status: "Em andamento",
      },
    ]);
  }, []);

  const handleOpenPopup = (atendimento: any) => {
    setAtendimentoSelecionado(atendimento);
    setIsPopupOpen(true);
  };

  const handleStatusUpdate = (id: string, novoStatus: string) => {
    setTratamentos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
    );
    onStatusChange(id, novoStatus);
  };

  if (!paciente) {
    return <p className="text-gray-500 p-4">Nenhum paciente encontrado.</p>;
  }

  return (
    <div className="h-[300px] overflow-y-auto pr-2 scrollbar scrollbar-thumb-[#267FF0] scrollbar-track-[#D9D9D9]">
      <div className="divide-y" style={{ borderColor: "#B3D3FC" }}>
        {tratamentos.map((tratamento) => (
          <div
            key={tratamento.id}
            className="flex py-3 px-2 items-start"
            style={{ borderBottom: "1px solid #B3D3FC" }}
          >
            {/* Nome e Data */}
            <div className="flex flex-col w-1/3 text-base text-black pr-2">
              <span className="font-bold text-base mb-1">
                {tratamento.nome}
              </span>
              <span className="text-base text-black">
                Data: {tratamento.data}
              </span>
            </div>

            <div className="w-1/3 flex text-black">
              {/* Dosagem */}
              <div className="w-1/2 flex flex-col items-start pr-2">
                <span className="font-bold text-base text-black">Dosagem</span>
                <span className="text-base text-black">
                  {tratamento.dosagem}
                </span>
              </div>

              {/* Status */}
              <div className="w-1/2 flex flex-col items-start pl-2">
                <span className="font-bold text-base text-black">Status</span>
                <span className="text-base text-black">
                  {tratamento.status}
                </span>
              </div>
            </div>

            {/* Botão Editar */}
            <div className="w-1/3 flex justify-end items-center">
              <button
                onClick={() =>
                  handleOpenPopup({
                    id: tratamento.id,
                    status: tratamento.status,
                    onConfirm: (novoStatus: string) =>
                      handleStatusUpdate(tratamento.id, novoStatus),
                  })
                }
                className="bg-[#267FF0] text-white font-semibold py-1 px-3 rounded-xl hover:brightness-110 transition-colors duration-200"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TratamentosTab;

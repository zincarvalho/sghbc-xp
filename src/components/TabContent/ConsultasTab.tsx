import React from "react";

interface Consulta {
  id: number;
  data: string;
  doutor: string;
  resumo: string;
  detalhesUrl: string;
}

interface Paciente {
  cpf: string;
  nome: string;
  idade: number;
  genero: string;
}

interface ConsultasTabProps {
  paciente: Paciente;
}

const consultasMock: Consulta[] = [
  {
    id: 1,
    data: "12/03/2024",
    doutor: "Dr. Marcos Silva",
    resumo:
      "Paciente relatou dor no peito durante esforços físicos. Solicitado ECG e ecocardiograma para análise mais detalhada.",
    detalhesUrl: "/docs/consulta1.pdf",
  },
  {
    id: 2,
    data: "28/01/2024",
    doutor: "Dra. Ana Costa",
    resumo:
      "Consulta de rotina dermatológica. Paciente apresentou sinais leves de dermatite. Prescrito creme tópico.",
    detalhesUrl: "/docs/consulta2.jpg",
  },
  {
    id: 3,
    data: "05/12/2023",
    doutor: "Dr. João Oliveira",
    resumo:
      "Paciente com queixas respiratórias. Ausculta revelou chiado leve. Indicado uso de broncodilatador por 7 dias.",
    detalhesUrl: "/docs/consulta3.pdf",
  },
  {
    id: 4,
    data: "20/11/2023",
    doutor: "Dra. Laura Martins",
    resumo:
      "Acompanhamento pós-operatório. Incisão cicatrizando bem. Paciente relata leve dor residual.",
    detalhesUrl: "/docs/consulta4.pdf",
  },
];

const ConsultasTab: React.FC<ConsultasTabProps> = ({ paciente }) => {
  return (
    <div
      className="h-[300px] overflow-y-auto pr-2 scrollbar scrollbar-thumb-[#267FF0] scrollbar-track-[#D9D9D9] scrollbar-thumb-rounded-none"
      style={{
        scrollbarWidth: "auto",
        scrollbarColor: "#267FF0 #D9D9D9",
      }}
    >
      <div className="divide-y" style={{ borderColor: "#B3D3FC" }}>
        {consultasMock.map((consulta) => (
          <div
            key={consulta.id}
            className="flex py-3 px-2 items-start"
            style={{ borderBottom: "1px solid #B3D3FC" }}
          >
            {/* Doutor e Data */}
            <div className="flex flex-col w-1/4 text-sm text-black pr-2">
              <span className="font-bold text-base mb-1">
                {consulta.doutor}
              </span>
              <span className="text-base">Data: {consulta.data}</span>
            </div>

            {/* Resumo */}
            <div className="flex-1 text-sm text-black text-center px-4">
              <span className="font-semibold block mb-1">
                Resumo da Consulta:
              </span>
              <span>{consulta.resumo}</span>
            </div>

            {/* Botão Detalhes */}
            <div className="w-1/4 flex justify-end items-center">
              <a
                href={consulta.detalhesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#267FF0] text-white font-semibold py-1 px-3 rounded-xl hover:brightness-110 transition-colors duration-200"
              >
                Detalhes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultasTab;

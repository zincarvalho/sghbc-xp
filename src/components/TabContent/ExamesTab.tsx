import React from "react";

interface Paciente {
  cpf: string;
  nome: string;
  idade: number;
  genero: string;
}

interface Exame {
  id: number;
  tipo: string;
  data: string;
  anexarUrl: string;
  detalhesUrl: string;
}

interface ExamesTabProps {
  paciente: Paciente | null;
}

const examesMock: Exame[] = [
  {
    id: 1,
    tipo: "Hemograma Completo",
    data: "15/03/2025",
    anexarUrl: "#",
    detalhesUrl: "#",
  },
  {
    id: 2,
    tipo: "Raio-X do Tórax",
    data: "02/02/2025",
    anexarUrl: "#",
    detalhesUrl: "#",
  },
  {
    id: 3,
    tipo: "Ressonância Magnética",
    data: "19/01/2025",
    anexarUrl: "#",
    detalhesUrl: "#",
  },
  {
    id: 4,
    tipo: "Eletrocardiograma",
    data: "10/12/2024",
    anexarUrl: "#",
    detalhesUrl: "#",
  },
];

const ExamesTab: React.FC<ExamesTabProps> = ({ paciente }) => {
  if (!paciente) {
    return <p className="text-black p-4">Nenhum paciente encontrado.</p>;
  }

  return (
    <div className="h-[300px] overflow-y-auto pr-2 scrollbar scrollbar-thumb-[#267FF0] scrollbar-track-[#D9D9D9]">
      <div className="divide-y" style={{ borderColor: "#B3D3FC" }}>
        {examesMock.map((exame) => (
          <div
            key={exame.id}
            className="flex py-3 px-2 items-start"
            style={{ borderBottom: "1px solid #B3D3FC" }}
          >
            {/* Tipo e Data */}
            <div className="flex flex-col w-1/3 text-sm text-black pr-2">
              <span className="font-bold text-base mb-1">
                Tipo: {exame.tipo}
              </span>
              <span className="text-base text-black">Data: {exame.data}</span>
            </div>

            {/* Botões */}
            <div className="w-2/3 flex justify-end items-center gap-3">
              <a
                href={exame.anexarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#267FF0] text-white font-semibold py-1 px-3 rounded-xl hover:brightness-110 transition-colors duration-200"
              >
                Anexar
              </a>
              <a
                href={exame.detalhesUrl}
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

export default ExamesTab;

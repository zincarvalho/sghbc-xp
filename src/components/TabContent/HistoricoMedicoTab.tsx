import React from "react";

interface HistoricoMedicoTabProps {
  paciente: any; // Tipar adequadamente futuramente

  /*
    Estrutura pronta para mock ou integração com API futura.
    Substitua os dados fixos abaixo por chamadas dinâmicas conforme necessário.
  */
}

const HistoricoMedicoTab = ({ paciente }: HistoricoMedicoTabProps) => {
  return (
    <div className="px-4 pt-0 space-y-6 text-sm">
      {/* Diagnósticos */}
      <div>
        {/* Subtítulo com zero margin-top, e espaço entre subtítulo e conteúdo */}
        <p className="text-base font-semibold mt-0 mb-3">Diagnósticos</p>
        <div className="flex gap-8">
          <p>Hipertensão</p>
          <p>Diabetes</p>
        </div>
        <hr className="border-t border-[#B3D3FC] mt-3" />
      </div>

      {/* Alergias */}
      <div>
        <p className="text-base font-semibold mt-0 mb-3">Alergias</p>
        <div className="flex gap-8">
          <p>Dipirona</p>
          <p>Penicilina</p>
        </div>
        <hr className="border-t border-[#B3D3FC] mt-3" />
      </div>

      {/* Cirurgias */}
      <div>
        <p className="text-base font-semibold mt-0 mb-3">Cirurgias</p>
        <div className="flex gap-8">
          <p>Cardiovascular</p>
          <p>Apendicectomia</p>
        </div>
        <hr className="border-t border-[#B3D3FC] mt-3" />
      </div>
    </div>
  );
};

export default HistoricoMedicoTab;

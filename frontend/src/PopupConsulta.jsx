import React from "react";
import logo from "./logo.svg";

export default function PopupConsulta({
  onClose,
  atendimento,
  onStatusChange,
}) {
  const handleStatusChange = (novoStatus) => {
    onStatusChange(atendimento.id, novoStatus);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-topper">
          <button onClick={onClose} className="popup-back">
            ←
          </button>
          <img src={logo} alt="Logo" className="popup-logo" />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-option blue">
            <input
              type="radio"
              name="status"
              onChange={() => handleStatusChange("Agendado")}
              defaultChecked={atendimento?.status === "Agendado"}
            />{" "}
            Agendamento
          </label>
          <label className="checkbox-option blue">
            <input
              type="radio"
              name="status"
              onChange={() => handleStatusChange("Realizado")}
              defaultChecked={atendimento?.status === "Realizado"}
            />{" "}
            Realizado
          </label>
          <label className="checkbox-option red">
            <input
              type="radio"
              name="status"
              onChange={() => handleStatusChange("Cancelado")}
              defaultChecked={atendimento?.status === "Cancelado"}
            />{" "}
            Cancelado
          </label>
        </div>
      </div>
    </div>
  );
}

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-sm text-[#267FF0] font-bold p-2 text-left underline">
      {/* Altere o href abaixo para o destino real do suporte quando disponível */}
      <a
        href="#"
        className="hover:brightness-110 transition-colors duration-200"
      >
        @suporte
      </a>
    </footer>
  );
};

export default Footer;

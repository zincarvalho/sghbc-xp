import React from "react";
import logo from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-[#ecf4ff] pt-4 pr-4 pb-2 pl-4 gap-6 h-[80px]">
      <div className="flex items-center gap-4">
        {/* Seta que leva à página anterior */}
        <button className="text-4xl font-bold text-black hover:opacity-80 p-0 m-0">
          &larr;
        </button>

        {/* Logo que leva à página inicial */}
        <a href="#" title="Página Inicial">
          <div className="h-[60px] flex items-center overflow-hidden">
            <img
              src={logo}
              alt="Logo do Projeto"
              className="h-[75px] object-contain"
              style={{
                marginTop: "0",
                marginLeft: "0",
              }}
            />
          </div>
        </a>
      </div>

      <div className="flex gap-16 font-bold items-center">
        <a href="#" className="text-black">
          Usuário
        </a>
        <a href="#" className="text-[#267ff0] hover:no-underline">
          Logout
        </a>
      </div>
    </header>
  );
};

export default Header;

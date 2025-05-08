import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["Histórico Médico", "Consultas", "Exames", "Tratamentos"];

  return (
    <div className="relative bg-[#ECF4FF] pt-0 pb-0">
      {/* Conteúdo das abas - sem padding lateral */}
      <div className="flex relative z-10">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab;
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;

          return (
            <div key={tab} className="flex-1 text-center relative mb-2 sm:mb-0">
              <button
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 pt-4 px-4 text-base font-bold w-full transition-colors duration-200 ${
                  isActive ? "text-black" : "text-black hover:text-blue-600"
                }`}
              >
                {tab}

                {/* Aba inativa — linha inferior */}
                {!isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#267FF0] z-0" />
                )}

                {/* Aba ativa — linha superior e laterais */}
                {isActive && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#267FF0] z-10" />
                    {!isFirst && (
                      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#267FF0] z-10" />
                    )}
                    {!isLast && (
                      <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-[#267FF0] z-10" />
                    )}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;

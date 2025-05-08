import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (cpf: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex items-center gap-2 px-4 mt-4">
      <input
        type="text"
        placeholder="Pesquise pelo Nome ou CPF"
        className="border rounded-[8px] px-3 py-2 text-sm w-[220px]"
        style={{ borderColor: "#B3D3FC", backgroundColor: "#FDFDFD" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="text-sm px-4 py-1 rounded-[9px] font-semibold"
        style={{ backgroundColor: "#267FF0", color: "#FFFFFF" }}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

import { ArrowLeft } from "lucide-react";
import SGHBC from "../../assets/SGHBC logo.png";

type HeaderProps = {
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  userName?: string;
};

export default function Header({
  showBackButton = false,
  onBackButtonClick,
  userName,
}: HeaderProps) {
  return (
    <header className="bg-[#ECF4FF] px-16 py-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBackButtonClick}
            className="text-gray-800 hover:text-azul-principal"
          >
            <ArrowLeft size={48} className="cursor-pointer" />
          </button>
        )}
        <img src={SGHBC} alt="Logo" className="h-20" />
      </div>

      <div className="flex items-center gap-16">
        <span className="text-gray-800 font-roboto font-bold text-2xl">
          {userName || "Usuário"}
        </span>
        <a
          href="#"
          className="text-azul-principal font-roboto font-bold text-2xl hover:underline"
        >
          Logout
        </a>
      </div>
    </header>
  );
}

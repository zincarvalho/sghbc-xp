import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
};

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label: string;
  options: Option[];
  size?: "sm" | "md" | "lg" | "full";
  placeholder?: string;
}

export default function Select({
  label,
  options,
  size = "full",
  placeholder = "Selecione",
  ...restProps
}: SelectProps) {
  const sizeClasses = {
    sm: "w-full md:w-48",
    md: "w-full md:w-64",
    lg: "w-full md:w-80",
    full: "w-full",
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-azul-principal mb-1 font-roboto">{label}</label>
      <div className={`relative ${sizeClasses[size]}`}>
        <select
          className="font-roboto appearance-none border border-gray-300 rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-azul-principal"
          {...restProps}
        >
          <option value="" disabled selected className="font-roboto">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="font-roboto"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

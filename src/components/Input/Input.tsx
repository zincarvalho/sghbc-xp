import { InputHTMLAttributes } from "react";

type BoxInputSize = "sm" | "md" | "lg" | "full" | "custom";
type InputType =
  | "text"
  | "tel"
  | "date"
  | "datetime-local"
  | "number"
  | "email"
  | "password";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizeBox?: BoxInputSize;
  sizeCustom?: number;
  inputType?: InputType;
  mask?: string;
}

export default function Input({
  label,
  sizeBox = "full",
  sizeCustom,
  inputType = "text",
  mask,

  ...restProps
}: InputProps) {
  const sizeClasses = {
    sm: "w-full md:w-48",
    md: "w-full md:w-64",
    lg: "w-full md:w-80",
    full: "w-full",
    custom: `w-full`,
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-azul-principal mb-1 font-roboto">{label}</label>
      <div
        className={`relative ${sizeClasses[sizeBox]}`}
        style={
          sizeBox === "custom" && sizeCustom
            ? { maxWidth: `${sizeCustom}px` }
            : {}
        }
      >
        <input
          type={inputType}
          className={`font-roboto border border-gray-300 rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-azul-principal`}
          placeholder={mask || ""}
          {...restProps}
        />
      </div>
    </div>
  );
}

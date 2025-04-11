import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  ...restProps
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-azul-principal text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`cursor-pointer px-8 py-2 rounded-md transition-colors ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

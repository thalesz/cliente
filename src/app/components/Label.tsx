import { FC } from "react";

interface LabelProps {
  htmlFor?: string; // Atributo para associar o rótulo a um elemento específico
  children: React.ReactNode; // Texto ou conteúdo do rótulo
  className?: string; // Classe adicional opcional
}

const Label: FC<LabelProps> = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 font-semibold ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;

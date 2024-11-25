import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "primary" | "secondary"; // Definição dos tipos de variantes
  className?: string; // Classe adicional opcional
}

const cardVariants = tv({
  base: "shadow-md rounded py-3 px-8 max-w-sm w-full transition-all",
  variants: {
    variant: {
      primary: "bg-white border border-gray-200",
      secondary: "bg-gray-100 border border-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const Card = ({ children, variant = "primary", className = "" }: CardProps) => {
  return (
    <div className={`${cardVariants({ variant })} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

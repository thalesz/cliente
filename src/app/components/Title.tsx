import { tv } from "tailwind-variants";
import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  size?: "small" | "medium" | "large"; // Definindo variantes de tamanho
  align?: "left" | "center" | "right"; // Variantes de alinhamento
  className?: string; // Classe extra opcional
}

const titleVariants = tv({
  base: "font-semibold mb-2", // Estilos base aplicados sempre
  variants: {
    size: {
      small: "text-lg",   // Tamanho pequeno
      medium: "text-2xl", // Tamanho médio (default)
      large: "text-4xl",  // Tamanho grande
    },
    align: {
      left: "text-left",
      center: "text-center", // Alinhamento centralizado (default)
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "medium",
    align: "center",
  },
});

const Title = ({ children, size = "medium", align = "center", className = "" }: TitleProps) => {
  return (
    <h1 className={`${titleVariants({ size, align })} ${className}`}>
      {children}
    </h1>
  );
};

export default Title;

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "w-full rounded my-1 px-4 py-2 text-sm font-bold transition-colors ease-in-out",
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-700 text-white",
      secundary: "bg-red-500 text-white hover:bg-red-700",
      custom: " border-2 border-[#3FB1E2] bg-white text-[#3FB1E2] hover:bg-[#3FB1E2] hover:text-white rounded-[4px] px-3 py-1 text-lg m-[24px_8px_0_8px] transition-all duration-300", // Estilos atualizados
      clicked: "border-2 border-[#3FB1E2] bg-[#3FB1E2] text-white hover:bg-[#3FB1E2] hover:text-white rounded-[4px] px-3 py-1 text-lg m-[24px_8px_0_8px] transition-all duration-300"
    }
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, className, children, ...props }: ButtonProps) => {
  const buttonClasses = twMerge(buttonVariants({ variant }), className);

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;

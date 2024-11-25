import { forwardRef, ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "rounded border-2 border-gray-400 bg-white p-1 placeholder-gray-300 outline-none",
});

type InputProps = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, placeholder = "Search...", type = "text", ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        <input
          className={inputVariants.base}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref} // Passa a ref para o elemento input aksksksksk
          {...props}
        />
      </div>
    );
  }
);

export default Input;

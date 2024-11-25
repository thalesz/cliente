import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  id?: string;
  label: string;
  options: string[];
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  className?: string;
  onSelect?: (option: string) => void;
}

const dropdownVariants = tv({
  base: "flex items-center justify-between rounded px-4 py-2 font-semibold focus:outline-none transition-all",
  variants: {
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-700",
      secondary: "bg-gray-500 text-white hover:bg-gray-700",
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "primary",
  },
});

const Dropdown = ({
  id,
  label,
  options,
  size = "medium",
  variant = "primary",
  className = "",
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    if (onSelect) onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-64">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`${dropdownVariants({ size, variant })} ${className} flex items-center justify-between w-full`}
      >
        <span>{label}</span>
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

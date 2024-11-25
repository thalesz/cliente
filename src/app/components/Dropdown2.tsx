import React from 'react';

interface DropdownProps {
    label: string;
    options: string[];
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    placeholder?: string; // Opcional: para casos em que um valor padrão como "Todos" é necessário
    variant?: string; // Para aplicar variantes
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, setSelectedValue, id, placeholder, variant }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    const baseStyles = "flex flex-col items-start p-2 border border-gray-300 rounded-md bg-gray-50 w-52 mb-2";
    const labelStyles = "mb-1 text-sm text-gray-700";
    const selectStyles = "w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    return (
        <div className={`${baseStyles} ${variant}`}>
            <label htmlFor={id} className={labelStyles}>
                {label}
            </label>
            <select
                id={id}
                value={selectedValue}
                onChange={handleChange}
                className={selectStyles}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

import React, { useState, useEffect } from 'react';

export interface SelectGrupoProps {
    grupos: string[];
    setGrupoSelect: React.Dispatch<React.SetStateAction<string>>;
    grupo?: string;
    children?: React.ReactNode;
}

const SelectGrupo: React.FC<SelectGrupoProps> = ({ grupos, setGrupoSelect, grupo }) => {
    const [selectedValue, setSelectedValue] = useState<string>(grupo || '');

    useEffect(() => {
        setSelectedValue(grupo || '');
    }, [grupo]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        setGrupoSelect(value);
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-md">
            <span className="bg-gray-200 text-gray-700 px-3 rounded-l-md">Grupo</span>
            <select
                disabled={!!grupo && grupo !== '' || grupos.length === 0}
                value={selectedValue}
                onChange={handleSelectChange}
                className="flex-1 p-2 border-0 rounded-r-md focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value=''>Todos</option>
                {grupos.map((option, index) => (
                    <option value={option} key={index}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectGrupo;

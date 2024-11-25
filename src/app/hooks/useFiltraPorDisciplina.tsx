import { useEffect, useState } from "react";
import { Itens, Item } from "../interface/Metrica";


const useFiltraPorDisciplina = (
    itens: Itens | undefined, 
    disciplinaSelect: string
) => {
    const [itensFiltrados, setItensFiltrados] = useState<Itens | undefined>(undefined);

    useEffect(() => {
        if (itens !== undefined) {
            // Filtra apenas pelo nome da disciplina selecionada
            const itensFiltradosPorDisciplina = itens.filter((item: Item) => 
                item.nomedisciplina === disciplinaSelect
            );
            // console.log("Itens filtrados por disciplina", itensFiltradosPorDisciplina);
            setItensFiltrados(itensFiltradosPorDisciplina);
        } else {
            // Se itens estiver indefinido, define itensFiltrados como undefined
            setItensFiltrados(undefined);
        }
    }, [itens, disciplinaSelect]);

    return itensFiltrados;
};

export default useFiltraPorDisciplina;

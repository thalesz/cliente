import { useEffect, useState } from "react";
import { Itens, Item } from "../interface/Metrica";

const useFiltraPorId = (itens: Itens | undefined, alunosMarcados: string[]) => {
    const [itensFiltrados, setItensFiltrados] = useState<Itens | undefined>(undefined);

    useEffect(() => {
        if (itens !== undefined && alunosMarcados.length > 0) {
            const alunosFiltrados = itens.filter((item: Item) => alunosMarcados.includes(item.aluno._id));
            console.log("Alunos filtrados", alunosFiltrados);
            setItensFiltrados(alunosFiltrados);
        } else {
            // If itens or alunosMarcados is undefined or empty, set itensFiltrados as undefined
            setItensFiltrados(undefined);
        }
    }, [itens, alunosMarcados]);

    return itensFiltrados;
};

export default useFiltraPorId;

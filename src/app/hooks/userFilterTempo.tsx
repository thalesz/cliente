import { useEffect, useState } from "react";
import { Prioridades, IPrioridades } from "../interface/Prioridade";

const useFilterTempo = (resultado: Prioridades | undefined) => {
    const [filteredResult, setFilteredResult] = useState<{ nome: string; tempoEsperado: number; tempoFeito: number; }[]>([]);

    useEffect(() => {
        if (resultado) {
            const prioridadeArray = resultado.map((item: IPrioridades) => ({
                nome: item.nome,
                tempoEsperado: item.tempoEsperado,
                tempoFeito: item.tempoFeito,
            }));
            
            setFilteredResult(prioridadeArray);
        }
    }, [resultado]);

    return filteredResult;
};

export default useFilterTempo;
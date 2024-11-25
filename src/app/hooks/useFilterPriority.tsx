import { useEffect, useState } from "react";
import { Prioridades, IPrioridades } from "../interface/Prioridade";

const useFilterPriority = (resultado: Prioridades | undefined) => {
    const [filteredResult, setFilteredResult] = useState<{ nome: string; prioridade: number }[]>([]);

    useEffect(() => {
        if (resultado) {
            const prioridadeArray = resultado.map((item: IPrioridades) => ({
                nome: item.nome,
                prioridade: item.prioridade,
            }));
            
            setFilteredResult(prioridadeArray);
        }
    }, [resultado]);

    return filteredResult;
};

export default useFilterPriority;

import { useEffect, useState } from "react";
import { Prioridades, IPrioridades } from "../interface/Prioridade";

const useFilterDesordem = (resultado: Prioridades | undefined) => {
    const [filteredResult, setFilteredResult] = useState<{ nome: string; nivelDesordem: number; average: number; percent: number; }[]>([]);

    useEffect(() => {
        if (resultado) {
            const prioridadeArray = resultado.map((item: IPrioridades) => ({
                nome: item.nome,
                nivel_desordem: item.nivelDesordem,
                Média: item.average,
                Porcetagem: item.percent
            }));
            
            setFilteredResult(prioridadeArray);
        }
    }, [resultado]);

    return filteredResult;
};

export default useFilterDesordem;
import { useEffect, useState } from "react";
import { Itens, Item } from "../interface/Metrica";


const useOrderByName = (resultado:Itens|undefined)=>{
    const [alunosFiltrados, setAlunosFiltrados] = useState<Itens | undefined>(undefined);
    useEffect(() => {
        if (resultado !== undefined) {
            // Ordenando os itens por nome
            const sortedItems = resultado.slice().sort((a: Item, b: Item) => {
                // Convertendo os nomes para minúsculas para garantir uma ordenação não sensível a maiúsculas/minúsculas
                const nomeA = a.aluno.nome.toLowerCase();
                const nomeB = b.aluno.nome.toLowerCase();
                // Comparando os nomes
                if (nomeA < nomeB) {
                    return -1;
                }
                if (nomeA > nomeB) {
                    return 1;
                }
                return 0;
            });
            // Atualizando o estado com os itens ordenados
            setAlunosFiltrados(sortedItems);
        }
    }, [resultado]);

    return alunosFiltrados;

}
export default useOrderByName;
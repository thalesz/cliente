import { useEffect, useState } from "react";
import { Itens } from "../interface/Metrica";


const useFiltrarDisciplinas = (resultado: Itens | undefined) => {
    const [disciplinasReturn, setDisciplinasReturn] = useState<string[]>([]);
    // console.log("resultado!!!", resultado);
    
    useEffect(() => {
        if (resultado && Array.isArray(resultado)) {
            // console.log("teste");
            
            // Filtrando e extraindo a disciplina
            const disciplinasTemp = resultado
                .filter(item => item.nomedisciplina)  // Garante que nomedisciplina existe
                .map(item => item.nomedisciplina);  // Extraí a disciplina
            
            // Usando Set para eliminar duplicatas
            const disciplinasSet = new Set(disciplinasTemp);
            const disciplinas = Array.from(disciplinasSet);
            
            // console.log("disciplinas", disciplinas);
            setDisciplinasReturn(disciplinas);
        }
    }, [resultado]);

    return disciplinasReturn;
};

export default useFiltrarDisciplinas;

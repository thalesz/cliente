import { Itens } from "../interface/Metrica";
import useFiltrarAlunos from "./useFiltrarAluno";
import useOrderByName from "./useOrderByName";

const useFiltrarEOrdenarAlunos = (resultado: Itens | undefined, textInput: string, grupoSelect: string) => {
    const alunosFiltrados = useFiltrarAlunos(resultado, textInput, grupoSelect);

    // Verifica se houve filtragem, se sim, aplica a ordenação pelo nome
    const alunosOrdenados= useOrderByName(alunosFiltrados);

    return alunosOrdenados;
};
export default useFiltrarEOrdenarAlunos
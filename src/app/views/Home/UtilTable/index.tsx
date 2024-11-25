import SearchByName, { SearchByNameProps } from "./SearchByName";
import SelectGrupo, { SelectGrupoProps } from "./SelectGrupo";

const UtilTable: React.FC<SearchByNameProps & SelectGrupoProps> = ({ setTextInput, textInput, grupos, setGrupoSelect, grupo }) => {
    return (
        <section className="mt-2 flex items-center justify-between w-full pb-0">
            <SearchByName
                setTextInput={setTextInput}
                textInput={textInput}
            />
            <SelectGrupo
                grupos={grupos}
                setGrupoSelect={setGrupoSelect}
                grupo={grupo}
            />
        </section>
    );
}

export default UtilTable;

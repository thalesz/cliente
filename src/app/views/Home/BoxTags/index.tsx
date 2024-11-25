import { useEffect } from "react";
import Button from "../../../components/Button";

interface BoxButtonHomeProps {
  nomes: string[];
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}

const BoxButtonHome: React.FC<BoxButtonHomeProps> = ({ nomes, select, setSelect }) => {

  useEffect(() => {
    console.log("Select", select);
  }, [select]);

  return (
    <section className="flex flex-wrap justify-center gap-4 p-4">
      {nomes.map((nome, index) => (
        <Button
          key={index}
          // Verificando se o nome é o selecionado e aplicando 'clicked', senão 'custom'
          variant={select === nome ? "clicked" : "custom"}
          onClick={() => setSelect(nome)}
          className="flex-1 min-w-[150px] max-w-[200px] transition-all duration-300" // Largura mínima e máxima para os botões
        >
          {nome}
        </Button>
      ))}
    </section>
  );
};

export default BoxButtonHome;

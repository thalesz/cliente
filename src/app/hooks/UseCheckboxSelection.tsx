
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCheckboxSelection = (setAlunosMarcados: any, alunosMarcados: any) => {
    const handleCheckboxChange = (itemId: string) => {
        const isSelected = alunosMarcados.includes(itemId);

        if (isSelected) {
            setAlunosMarcados(alunosMarcados.filter((id: string) => id !== itemId));
        } else {
            setAlunosMarcados([...alunosMarcados, itemId]);
        }
    };

    return { handleCheckboxChange };
};

export default useCheckboxSelection;

export interface SearchByNameProps {
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  textInput: string;
}

const SearchByName: React.FC<SearchByNameProps> = ({ setTextInput, textInput }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextInput(event.target.value);
  };

  return (
      <div className="flex items-center border border-gray-300 rounded-md">
          <span className="bg-gray-200 text-gray-700 px-3 rounded-l-md">Aluno</span>
          <input 
              type="text"
              placeholder="Nome"
              className="flex-1 p-2 border-0 rounded-r-md focus:ring-2 focus:ring-blue-500"
              aria-label="Username"
              value={textInput}
              onChange={handleInputChange}
          />
      </div>
  );
}

export default SearchByName;

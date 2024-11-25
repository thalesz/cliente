import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchHeaderFinal: React.FC = () => {
    return (
        <section className="p-4 bg-blue-500 flex justify-end">
            <div className="flex items-center w-full max-w-md border border-gray-300 rounded-md shadow-sm bg-white">
                <input
                    type="text"
                    className="flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md"
                    placeholder="Pesquisar"
                />
                <button className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
                </button>
            </div>
        </section>
    );
};

export default SearchHeaderFinal;

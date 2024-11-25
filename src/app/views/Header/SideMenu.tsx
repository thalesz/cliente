import React, { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative">
            {!menuOpen && (
                <button
                className="p-4 mx-5 bg-blue-500 text-white rounded-md hover:bg-gray-700"
                onClick={toggleMenu}
                >
                    <FontAwesomeIcon className="text-2xl" icon={faBars} />
                </button>
            
            )}

            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex flex-col text-white">
                    {/* Botão de fechar */}
                    <button
                        className="self-end m-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon className="text-lg" icon={faX} />
                    </button>

                    {/* Conteúdo do menu */}
                    <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                        <ul className="space-y-2 text-lg">
                            <li className="hover:text-gray-400 cursor-pointer">Item 1</li>
                            <li className="hover:text-gray-400 cursor-pointer">Item 2</li>
                            <li className="hover:text-gray-400 cursor-pointer">Item 3</li>
                        </ul>
                    </div>

                    {/* Footer do menu */}
                    <div className="p-4 text-center">
                        {/* Substitua por componentes adicionais se necessário */}
                        <button className="p-2 bg-red-600 rounded-md hover:bg-red-500">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideMenu;

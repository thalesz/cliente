import React from 'react';

interface RotuloProps {
    atual: string;
    titulo: string;
    iconeUrl?: string;  // URL para o ícone
}

const Rotulo: React.FC<RotuloProps> = ({ atual, titulo, iconeUrl }) => {
    return (
        <div className="bg-gray-100 p-2 border-b border-gray-300 text-center rounded-lg shadow-md mb-4 w-full" >
            <div className="flex flex-col items-center"> {/* Use flex-col para coluna */}
                {iconeUrl && (
                    <img 
                        src={iconeUrl} 
                        alt="ícone" 
                        className="mb-2" 
                        style={{ width: '32px', height: '32px' }} // Tamanho do ícone ajustado para 32x32
                    />
                )}
                <span className="font-bold">{titulo}</span>
                <span>{atual || 'Todos'}</span>
            </div>
        </div>
    );
}

export default Rotulo;

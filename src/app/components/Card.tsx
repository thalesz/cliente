import React from 'react';

interface CardProps {
  title: string;
  onButtonClick: () => void;
  buttonText?: string; // Propriedade opcional
  buttonClassName?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, onButtonClick, buttonText = 'Ir para Usuários', buttonClassName = '', children }) => {
  return (
    <div className="bg-white shadow-md rounded p-8 max-w-md w-full text-center ">
      <h1 className="text-2xl font-semibold mb-6">{title}</h1>
      <button 
        onClick={onButtonClick} 
        className={`bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 ${buttonClassName}`}
      >
        {buttonText}
      </button>
      {children}
    </div>
  );
};

export default Card;

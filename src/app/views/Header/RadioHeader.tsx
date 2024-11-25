import React from "react";

const RadioHeader: React.FC = () => {
    return (
        <section className="flex items-center space-x-2 p-4">
            <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="text-gray-700">Por tópico</label>
        </section>
    );
};

export default RadioHeader;

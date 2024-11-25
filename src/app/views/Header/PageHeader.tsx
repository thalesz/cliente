import React from "react";
import IconButtonFinal from "./IconButtonFinal";    
import RadioHeader from "./RadioHeader"; // Ensure that the file RadioHeader.tsx exists in the same directory
import SearchHeaderFinal from "./SearchHeaderFinal";
import SideMenu from "./SideMenu";

const PageHeader: React.FC = () => {
    return (
        <section className="flex items-center justify-between p-4 bg-blue-500  ">
            {/* Menu Lateral */}
            <div className="flex-shrink-0">
                <SideMenu />
            </div>
            <div className="flex-shrink-0 mx-[30px]">
                <IconButtonFinal />
            </div>

            {/* Barra de Pesquisa */}
            <div className="flex-grow mx-4">
                <SearchHeaderFinal />
            </div>

            {/* Rádio e Icon Button */}
            <div className="flex items-center space-x-4">
                <RadioHeader />
                {/* <IconButtonFinal /> */}
            </div>
        </section>
    );
};

export default PageHeader;

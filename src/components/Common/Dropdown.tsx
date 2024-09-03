import React, { useState, useEffect } from 'react';

import Slider from '../Form/Slider';
import TypeFilter from '../Form/TypeFilter';
import FilterIcon from "../Icons/Filter";

const Dropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (dropdownOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    
        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [dropdownOpen]);

    const toggleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <>
            <div className="shrink-0 flex place-items-center ml-2">
                <button className="bg-transparent w-[44px] h-[44px] flex place-items-center justify-center" onClick={toggleDropdownOpen}>
                    <FilterIcon size="26" />
                </button>
            </div>

            {
                dropdownOpen 
                &&
                <div className="absolute z-50 w-full h-full top-[80px] left-0 right-0 bg-black/75 backdrop-blur">
                    <div className="flex flex-col bg-slate-900 border-t border-slate-700 px-4 py-6">
                        <Slider minYear={1970} maxYear={new Date().getFullYear()} />
                        <TypeFilter />
                    </div>
                </div>
            }
        </>
    )
}

export default Dropdown;
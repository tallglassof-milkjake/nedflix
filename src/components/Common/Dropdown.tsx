import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Slider from '../Form/Slider';
import TypeFilter from '../Form/TypeFilter';
import Filter from '../../assets/svgs/filter.svg';
import DropdownItem from './DropdownItem';

const Dropdown: React.FC = () => {
    const filter = useSelector((state: RootState) => state.omdb.filter);
    const currentYearRange = useSelector((state: RootState) => state.omdb.yearRange);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    // const dropdownItems: FilterItem[] = [
    //     {
    //         id: 'type-filter',
    //         name: 'Type',
    //         value: filter,
    //         options: [
    //             'all',
    //             'movie',
    //             'series',
    //             'episode',
    //         ]
    //     },
    //     {
    //         id: 'year-filter',
    //         name: 'Year',
    //         value: [
    //             1970,
    //             new Date().getFullYear(),
    //         ],
    //         options: [
    //             1970,
    //             new Date().getFullYear(),
    //         ]
    //     },
    // ];

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
            <div className="">
                <button onClick={toggleDropdownOpen}>
                    <img src={Filter} alt="" />
                </button>
            </div>

            {
                dropdownOpen 
                ?
                <div className="absolute z-50 w-full h-full top-[67px] left-0 right-0 bg-black/75 backdrop-blur">
                    <div className="flex flex-col bg-white border-b border-gray-300 px-4 py-6">
                        <Slider minYear={1970} maxYear={new Date().getFullYear()} currentQuery={currentYearRange} />
                        <TypeFilter />
                    </div>
                </div>
                // <div className="absolute z-50 h-full w-full top-[67px] left-0 right-0 bg-black/75 backdrop-blur">
                //     {dropdownItems.map((item, index) => (
                //         <DropdownItem dropdownItem={item} key={index} />
                //     ))}
                // </div>
                :
                <></>
            }
        </>
    )
}

export default Dropdown;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import DropdownItem from './DropdownItem';

const Dropdown: React.FC = () => {
    const filter = useSelector((state: RootState) => state.omdb.filter);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([
        {
            id: 'type-filter',
            name: 'Type',
            value: filter,
            options: [
                'all',
                'movie',
                'series',
                'episode',
            ]
        },
        {
            id: 'year-filter',
            name: 'Year',
            value: [
                1970,
                new Date().getFullYear(),
            ],
            options: [
                1970,
                new Date().getFullYear(),
            ]
        },
    ]);

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
                    Open
                </button>
            </div>

            {
                dropdownOpen 
                ?
                <div className="absolute h-full w-full top-[67px] left-0 right-0 bg-black/75 backdrop-blur">
                    {dropdownItems.map((item, index) => (
                        <DropdownItem dropdownItem={item} key={index} />
                    ))}
                </div>
                :
                <></>
            }
        </>
    )
}

export default Dropdown;
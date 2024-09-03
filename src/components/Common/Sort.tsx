import React, { useState, useEffect } from 'react';
import { setSorting } from '../../store/slices/omdbSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'store/store';

import HorizontalDotMenuIcon from '../Icons/HorizontalDotMenu';

const Sort: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [menuOpen, setMenuOpen] = useState(false);
    const sort = useSelector((state: RootState) => state.omdb.sort);

    const handleAlphaSort = (): void => {
        // TODO: Handle this in a more efficient way
        if (sort === 'alphaAsc') {
            dispatch(setSorting('alphaDesc'));
        } else if (sort === 'alphaDesc') {
            dispatch(setSorting('alphaAsc'));
        } else {
            dispatch(setSorting('alphaAsc'));
        }
    };

    const handleYearSort = (): void => {
        // TODO: Handle this in a more efficient way
        if (sort === 'yearAsc') {
            dispatch(setSorting('yearDesc'));
        } else if (sort === 'yearDesc') {
            dispatch(setSorting('yearAsc'));
        } else {
            dispatch(setSorting('yearAsc'));
        }
    };

    const handleClearSorting = (): void => {
        dispatch(setSorting('none'));
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            
            // Check if the clicked element or any of its parents is the sort-button
            if (!target.closest('#sort-button')) {
                // If not, call setMenuOpen(false)
                setMenuOpen(false);
            }
        };

        window.addEventListener('click', handleClick);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [menuOpen, setMenuOpen]); // Include setMenuOpen in the dependency array

    return (
        <div className="relative">
            <button id="sort-button" className="bg-transparent p-2 hover:bg-slate-200 rounded-md" onClick={() => setMenuOpen(!menuOpen)}>
                <HorizontalDotMenuIcon stroke="#020617" />
            </button>

            {
                menuOpen 
                &&
                <div className="absolute right-0 w-[150px] flex flex-col gap-2 p-2 h-fit bg-white z-50 rounded-md shadow-md">
                    <button className="text-slate-900 text-sm w-full px-5 py-1 font-medium hover:bg-slate-100 rounded-md" onClick={handleAlphaSort}>
                        A-z
                    </button>
                    <button className="text-slate-900 text-sm w-full px-5 py-1 font-medium hover:bg-slate-100 rounded-md" onClick={handleYearSort}>
                        Year
                    </button>
                    {
                        sort !== 'none' 
                        &&
                        <button className="text-slate-900 text-sm w-full px-5 py-1 font-medium hover:bg-slate-100 rounded-md" onClick={handleClearSorting}>
                            Clear sorting
                        </button>
                    }
                </div>
            }
        </div>
    );
};

export default Sort;
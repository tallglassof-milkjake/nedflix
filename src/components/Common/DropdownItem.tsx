import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, searchMovies } from '../../store/slices/omdbSlice';
import { RootState, AppDispatch } from '../../store/store';
import Slider from '../Form/Slider';

interface Props {
    dropdownItem: Record<string, any>;
}

const DropdownItem: React.FC<Props> = ({dropdownItem}) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentFilter = useSelector((state: RootState) => state.omdb.filter);
    const currentQuery = useSelector((state: RootState) => state.omdb.query);
    const currentYearRange = useSelector((state: RootState) => state.omdb.yearRange);
    const [activeFilter, setActiveFilter] = useState(currentFilter)

    const isValidFilter = (value: string): value is 'all' | 'movie' | 'series' | 'episode' => {
        return ['all', 'movie', 'series', 'episode'].includes(value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Select filter', event.target.value);
        const selectedValue = event.target.value;

        if (dropdownItem.id === 'type-filter' && isValidFilter(selectedValue)) {
            dispatch(setFilter(selectedValue));
        }
    }

    useEffect(() => {
        if (dropdownItem.id === 'type-filter' && currentQuery) {
            dispatch(searchMovies(currentQuery));
        }
    }, [currentFilter, currentQuery, dropdownItem.id, dispatch]);

    return (
        <>
            <div className="bg-white border-b border-gray-300 px-4 py-6">
                <p className="font-semibold text-sm">
                    { dropdownItem.name }
                </p>

                {
                    dropdownItem.id === 'type-filter'
                    ?
                        <div className="flex flex-row flex-wrap gap-2">
                            {dropdownItem.options.map((option: string, index: number) => (
                                <div className="flex flex-row gap-2 place-items-center" key={index}>
                                    <input type="radio" value={option.toString()} checked={option === currentFilter} onChange={(e) => handleSelect(e)} />
                                    <p className={option === currentFilter ? 'font-semibold text-red-500' : ''}>
                                        {option}
                                    </p>
                                </div>
                            ))}
                        </div>
                    :
                        <Slider minYear={1970} maxYear={new Date().getFullYear()} currentQuery={currentYearRange} />
                }
            </div>
        </>
    )
}

export default DropdownItem;
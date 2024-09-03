import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, searchMovies } from '../../store/slices/omdbSlice';
import { RootState, AppDispatch } from '../../store/store';
import Slider from '../Form/Slider';
import RadioSelector from '../Form/RadioSelector';

interface Props {
    dropdownItem: FilterItem;
}

const DropdownItem: React.FC<Props> = ({dropdownItem}) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentFilter = useSelector((state: RootState) => state.omdb.filter);
    const page = useSelector((state: RootState) => state.omdb.page);
    const currentQuery = useSelector((state: RootState) => state.omdb.query);
    const currentYearRange = useSelector((state: RootState) => state.omdb.yearRange);

    const isValidFilter = (value: string): value is 'all' | 'movie' | 'series' | 'episode' => {
        return ['all', 'movie', 'series', 'episode'].includes(value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;

        if (dropdownItem.id === 'type-filter' && isValidFilter(selectedValue)) {
            dispatch(setFilter(selectedValue));
        }
    }

    useEffect(() => {
        if (dropdownItem.id === 'type-filter' && currentQuery) {
            const query = currentQuery;
            if (query) {
                dispatch(searchMovies({query, page}));
            }
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
                        <RadioSelector item={dropdownItem} currentFilter={currentFilter} handleSelect={(e) => handleSelect(e)} />
                    :
                        <Slider minYear={1970} maxYear={new Date().getFullYear()} currentQuery={currentYearRange} />
                }
            </div>
        </>
    )
}

export default DropdownItem;
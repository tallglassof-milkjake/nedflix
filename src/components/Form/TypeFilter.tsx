import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setFilter } from "../../store/slices/omdbSlice";

import RadioSelector from "./RadioSelector";

const TypeFIlter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filter = useSelector((state: RootState) => state.omdb.filter);
    const currentFilter = useSelector((state: RootState) => state.omdb.filter);
    
    const typeFilterOptions = {
        id: 'type-filter',
        name: 'Type',
        value: filter,
        options: [
            'all',
            'movie',
            'series',
            'episode',
        ]
    };

    const isValidFilter = (value: string): value is 'all' | 'movie' | 'series' | 'episode' => {
        return ['all', 'movie', 'series', 'episode'].includes(value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;

        if (typeFilterOptions.id === 'type-filter' && isValidFilter(selectedValue)) {
            dispatch(setFilter(selectedValue));
        }
    };

    return (
        <div className="p-4">
            <label className="font-semibold text-gray-100 text-sm uppercase">Type</label>
            <RadioSelector item={typeFilterOptions} currentFilter={currentFilter} handleSelect={(e) => handleSelect(e)} />
        </div>
    )
};

export default TypeFIlter;
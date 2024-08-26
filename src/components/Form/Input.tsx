// src/components/SearchMovies.tsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchMovies, resetSearch, setSearchQuery } from '../../store/slices/omdbSlice';

interface Props {
    shouldAutoFocus?: boolean;
}

const SearchMovies: React.FC<Props> = ({ shouldAutoFocus = false }) => {
    const queryState = useSelector((state: RootState) => state.omdb.query);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const dispatch = useDispatch<AppDispatch>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (shouldAutoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [shouldAutoFocus]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        dispatch(setSearchQuery(newQuery));
        if (newQuery.trim()) {
            dispatch(resetSearch());
            dispatch(searchMovies(newQuery));
        }
    };

    return (
        <div>
            <input 
                ref={inputRef}
                className="px-5 py-2 rounded-xl bg-transparent border border-gray-300 w-full max-w-[500px] min-w-[200px]"
                type="text" 
                value={queryState ?? ''} 
                onChange={(e) => handleSearch(e)} 
                placeholder="Search movies..."
            />
        </div>
    );
};

export default SearchMovies;

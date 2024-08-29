import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchMovies, resetSearch, setSearchQuery } from '../../store/slices/omdbSlice';

interface Props {
    shouldAutoFocus?: boolean;
}

const SearchMovies: React.FC<Props> = ({ shouldAutoFocus = false }) => {
    const queryState = useSelector((state: RootState) => state.omdb.query);
    const page = useSelector((state: RootState) => state.omdb.page);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const dispatch = useDispatch<AppDispatch>();
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>(queryState ?? '');
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    useEffect(() => {
        if (shouldAutoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [shouldAutoFocus]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue && debouncedValue !== queryState) {
            dispatch(setSearchQuery(debouncedValue));
            dispatch(searchMovies({ query: debouncedValue, page }));
        } else if (!debouncedValue) {
            dispatch(resetSearch());
        }
    }, [debouncedValue, dispatch, page]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);
    };

    return (
        <div>
            <input 
                ref={inputRef}
                className="px-5 py-2 rounded-xl bg-transparent border border-gray-300 w-full max-w-[500px] min-w-[300px] font-semibold text-gray-100 placeholder-gray-300 placeholder-opacity-50 focus:outline-none focus:border-amber-300 focus:bg-slate-800 focus:ring-1 focus:ring-amber-300"
                type="text" 
                value={inputValue} 
                onChange={(e) => handleSearch(e)} 
                placeholder="Search movies..."
            />
        </div>
    );
};

export default SearchMovies;

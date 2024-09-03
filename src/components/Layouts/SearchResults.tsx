import React from 'react';

import SearchResult from '../Cards/SearchResult';
import Sort from '../Common/Sort';

interface Props {
    results: Record<string, string>[];
    totalResults: number;
    loading: boolean;
    handleClick: (movie: Record<string, any>) => void;
    noResults: boolean;
    children?: React.ReactNode;
}

const SearchResults: React.FC<Props> = ({results, totalResults, loading, handleClick, children, noResults}) => {
    
    return (
        <>
            <div className="bg-slate-100 w-full shrink-0 lg:w-1/3 lg:border-r lg:border-gray-300 py-7 h-full max-h-full overflow-auto">
                <div className="pb-7 px-5 flex flex-row justify-between place-items-center border-b border-gray-300">
                    <p className="text-sm font-black">
                        { totalResults ?? 0 } RESULTS
                    </p>

                    <Sort />
                </div>
                <div>
                    {
                        !noResults ?
                        <ul className="flex flex-col">
                            {results.map((movie: Record<string, string>, index: number) => (
                                <SearchResult key={index} movie={movie} id={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year || new Date(movie.Released).toLocaleDateString()} type={movie.Type} handleClick={() => handleClick(movie)} />
                            ))}
                        </ul>
                        :
                        <p className="text-slate-900 font-semibold w-full text-center py-6">
                            No results
                        </p>
                    }
                    { loading && <p className="w-full py-4 text-center text-slate-900 font-semibold">Loading...</p> }

                    { children }
                </div>
            </div>
        </>
    );
};

export default SearchResults;
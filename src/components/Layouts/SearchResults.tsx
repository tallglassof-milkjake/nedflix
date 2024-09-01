import React from 'react';

import SearchResult from '../Cards/SearchResult';

interface Props {
    results: Record<string, string>[];
    totalResults: number;
    loading: boolean;
    handleClick: (id: string) => void;
    children?: React.ReactNode;
}

const SearchResults: React.FC<Props> = ({results, totalResults, loading, handleClick, children}) => {

    return (
        <>
            <div className="bg-slate-100 w-full shrink-0 lg:w-1/3 lg:border-r lg:border-gray-300 py-7 h-full max-h-full overflow-auto">
                <div className="pb-7 px-5 flex flex-row justify-between place-items-center border-b border-gray-300">
                    <p className="text-sm font-black">
                        { totalResults } RESULTS
                    </p>
                </div>
                <div>
                    <ul className="flex flex-col">
                        {results.map((movie: Record<string, string>, index: number) => (
                            <SearchResult key={index} id={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} handleClick={() => handleClick(movie.imdbID)} />
                        ))}
                    </ul>
                    { loading && <p>Loading...</p> }

                    { children }
                </div>
            </div>
        </>
    );
};

export default SearchResults;
import React from 'react';

import SearchResult from '../Cards/SearchResult';

interface Props {
    results: Record<string, string>[];
    totalResults: number;
    loading: boolean;
    handleClick: (id: string) => void;
}

const SearchResults: React.FC<Props> = ({results, totalResults, loading, handleClick}) => {

    return (
        <>
            <div className="w-full lg:w-1/4 lg:border-r lg:border-gray-100 py-7">
                <p className="pb-7 px-5 text-sm font-black border-b border-gray-300">
                    { totalResults } RESULTS
                </p>
                <ul className="flex flex-col">
                    {results.map((movie: Record<string, string>, index: number) => (
                        <SearchResult key={index} poster={movie.Poster} title={movie.Title} year={movie.Year} handleClick={() => handleClick(movie.imdbID)} />
                    ))}
                </ul>
                { loading && <p>Loading...</p> }
            </div>
        </>
    );
};

export default SearchResults;
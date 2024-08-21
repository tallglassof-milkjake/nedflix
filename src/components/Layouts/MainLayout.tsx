import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { searchMovies, loadMore } from '../../store/slices/omdbSlice';

import SearchResult from '../Cards/SearchResult';

const MainLayout: React.FC = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state: RootState) => state.omdb.searchResults);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const totalResults = useSelector((state: RootState) => state.omdb.totalResults);
    const page = useSelector((state: RootState) => state.omdb.page);
    // const query = useSelector((state: RootState) => state.omdb.query);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (page === 1) {
            // dispatch(searchMovies(query));
        }
    }, [dispatch, page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && searchResults.length < totalResults) {
                dispatch(loadMore());
            }
        }, { threshold: 1.0 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [dispatch, loading, searchResults.length, totalResults]);

    const handleClick = (id: string): void => {
        console.log('Handle click', id);
    }

    return (
        <div className="flex flex-row flex-nowrap">
            <div className="w-full lg:w-1/4 lg:border-r lg:border-gray-100 px-10 py-7">
                <p>
                    { searchResults.length } results out of { totalResults }
                </p>
                <ul className="flex flex-col gap-6">
                    {searchResults.map((movie: Record<string, string>, index: number) => (
                        <SearchResult key={index} poster={movie.Poster} title={movie.Title} year={movie.Year} handleClick={() => handleClick(movie.imdbID)} />
                    ))}
                </ul>
                { loading && <p>Loading...</p> }
                <div ref={loadMoreRef} className="h-[20px]" />
            </div>
        </div>
    )
}

export default MainLayout;
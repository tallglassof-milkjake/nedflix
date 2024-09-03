import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchMovies, searchSingleResult, loadMore, setSelectedId, clearSelected, fetchEpisode } from '../../store/slices/omdbSlice';

// Components
import InfoLayout from './InfoLayout';
import SearchResults from './SearchResults';

const MainLayout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [filteredResults, setFilteredResults] = useState<Record<string, any>[]>([]);
    const searchResults = useSelector((state: RootState) => state.omdb.searchResults);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const totalResults = useSelector((state: RootState) => state.omdb.totalResults);
    const page = useSelector((state: RootState) => state.omdb.page);
    const yearRange = useSelector((state: RootState) => state.omdb.yearRange);
    const filter = useSelector((state: RootState) => state.omdb.filter);
    const query = useSelector((state: RootState) => state.omdb.query);
    const sort = useSelector((state: RootState) => state.omdb.sort);
    const storeError = useSelector((state: RootState) => state.omdb.error);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const checkScreenWidth = (width: number): boolean => width <= 768;

    useEffect(() => {
        const screenWidth:number = window.innerWidth;
        setIsMobile(checkScreenWidth(screenWidth));

        window.addEventListener("resize", () => setIsMobile(checkScreenWidth(screenWidth)));
    }, [isMobile]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && !fetching && searchResults.length < totalResults && !storeError) {
                if (query) {
                    setFetching(true);
                    dispatch(loadMore());
                    dispatch(searchMovies({ query, page: page + 1 }))
                    .finally(() => setFetching(false));
                }
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
    }, [dispatch, loading, searchResults.length, totalResults, query, page, fetching, storeError]);

    useEffect(() => {
        if (searchResults.length === 0) {
            setNoResults(true);
            setFilteredResults([]);
            return;
        }
        
        const filtered = searchResults.filter((movie: Record<string, string>) => {
            let movieYear = null;

            if (movie.Year) {
                movieYear = parseInt(movie.Year, 10);
            } else if (movie.Released) {
                const releaseDate = new Date(movie.Released);
                movieYear = releaseDate.getFullYear();
            }

            const isYearInRange = movieYear !== null && movieYear >= yearRange[0] && movieYear <= yearRange[1];
            const isTypeMatch = filter === 'all' || (movie.Type ? movie.Type === filter : (filter === 'episode' || filter === 'series'));
            return isYearInRange && isTypeMatch;
        });
        setNoResults(filtered.length === 0);

        switch (sort) {
            case 'alphaAsc':
                filtered.sort((a, b) => a.Title.localeCompare(b.Title));
                break;
            case 'alphaDesc':
                filtered.sort((a, b) => b.Title.localeCompare(a.Title));
                break;
            case 'yearAsc':
                filtered.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
                break;
            case 'yearDesc':
                filtered.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
                break;
            case 'none':
                // No sorting, keep the original order
                break;
            default:
                break;
        }

        setFilteredResults(filtered);
    }, [searchResults, sort, yearRange, filter]);

    const handleClick = (movie: Record<string, any>): void => {
        let id: string = movie.imdbID;

        if (id) {
            dispatch(setSelectedId(id));
            if (movie.Type && movie.Type !== 'episode') {
                dispatch(searchSingleResult())
            } else {
                // Handle load a particular episode here
                dispatch(fetchEpisode({ episode: movie.Episode, season: movie.Season }))
            }
            setSelected(true);
        }
    }

    const handleClearSelected = (): void => {
        dispatch(clearSelected());
        setSelected(false);
    }

    return (
        <>
            {
                isMobile ? 
                    <div className="flex flex-row flex-nowrap overflow-hidden h-full" style={{maxHeight: 'calc(100vh - 80px)',}}>
                        {
                            !selected ?
                                <SearchResults noResults={noResults} results={filteredResults} totalResults={totalResults} loading={loading} handleClick={handleClick} >
                                    <div ref={loadMoreRef} className="h-[20px]" />
                                </SearchResults>
                            :
                                <InfoLayout onClearSelected={handleClearSelected} />
                        }
                    </div>
                :
                    <div className="flex flex-row flex-nowrap overflow-hidden h-full" style={{maxHeight: 'calc(100vh - 80px)',}}>
                        <SearchResults noResults={noResults} results={filteredResults} totalResults={totalResults} loading={loading} handleClick={handleClick} >
                            <div ref={loadMoreRef} className="h-[20px]" />
                        </SearchResults>
                        <InfoLayout onClearSelected={handleClearSelected} />
                    </div>
            }
        </>
    )
}

export default MainLayout;
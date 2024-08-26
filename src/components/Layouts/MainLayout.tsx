import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchMovies, searchSingleResult, loadMore, setSelectedId, clearSelected } from '../../store/slices/omdbSlice';

// Components
import InfoLayout from './InfoLayout';
import SearchResults from './SearchResults';

const MainLayout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const searchResults = useSelector((state: RootState) => state.omdb.searchResults);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const totalResults = useSelector((state: RootState) => state.omdb.totalResults);
    const page = useSelector((state: RootState) => state.omdb.page);
    const yearRange = useSelector((state: RootState) => state.omdb.yearRange);
    const query = useSelector((state: RootState) => state.omdb.query);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const checkScreenWidth = (width: number): boolean => width <= 768;

    useEffect(() => {
        const screenWidth:number = window.innerWidth;
        console.log(screenWidth);
        setIsMobile(checkScreenWidth(screenWidth));

        window.addEventListener("resize", () => setIsMobile(checkScreenWidth(screenWidth)));
    }, [isMobile]);

    // TODO: pagination querying should be implemented
    useEffect(() => {
        if (page === 1) {
            if (query) {
                dispatch(searchMovies(query));
            }
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
        if (id) {
            dispatch(setSelectedId(id));
            dispatch(searchSingleResult())
            setSelected(true);
        }
    }

    const filteredResults = searchResults.filter((movie: Record<string, string>) => {
        const movieYear = parseInt(movie.Year, 10);
        return movieYear >= yearRange[0] && movieYear <= yearRange[1];
    });

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
                            <>
                                <SearchResults results={filteredResults} totalResults={totalResults} loading={loading} handleClick={handleClick} >
                                    <div ref={loadMoreRef} className="h-[20px]" />
                                </SearchResults>
                                {/* <InfoLayout onClearSelected={handleClearSelected} /> */}
                            </>
                            :
                            <InfoLayout onClearSelected={handleClearSelected} />
                        }
                    </div>
                :
                    <div className="flex flex-row flex-nowrap overflow-hidden h-full" style={{maxHeight: 'calc(100vh - 80px)',}}>
                        <SearchResults results={filteredResults} totalResults={totalResults} loading={loading} handleClick={handleClick} >
                            <div ref={loadMoreRef} className="h-[20px]" />
                        </SearchResults>
                        <InfoLayout onClearSelected={handleClearSelected} />
                    </div>
            }
        </>
    )
}

export default MainLayout;
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BookmarkIcon from '../Icons/Bookmark';

interface Props {
    movie: Record<string, string | string[]>
    poster: string;
    title: string;
    year: string;
    id: string;
    type: string;
    handleClick: () => void;
}

const SearchResult: React.FC<Props> = ({ movie, poster, title, year, id, type, handleClick }) => {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    
    const {
        Title,
        Poster,
        Type,
        Year,
        Season,
        Episode,
        Released,
    } = movie;

    return (
        <button onClick={handleClick} className="cursor-pointer transition-all hover:bg-gray-100">
            <li className="flex flex-row gap-4 px-5 py-7 border-b border-gray-300 relative">
                <img className="h-[80px] w-[80px] shrink-0 object-contain rounded-md" src={Poster !== 'N/A' ? Poster as string : 'https://placehold.co/80'} alt={`${Title} poster`} />
                <div className="flex flex-col text-start">
                    <h3 className="text-lg font-semibold">
                        { Title } - <span className="text-sm font-light uppercase text-slate-600">{Type ? Type : 'episode'}</span>
                    </h3>
                    {
                        (!Type || Type === 'episode')
                        &&
                        <p className="text-md font-thin">
                            S{Season}, Episode {Episode}
                        </p>
                    }
                    <p className="text-md font-thin">
                        { Released || Year }
                    </p>
                </div>
                {
                    wishlistItems.some((item: Record<string, any>) => item.imdbID === id) 
                    &&
                    <div className="absolute right-5 bottom-7">
                        <BookmarkIcon size="28" stroke="#213547" />
                    </div>
                }
            </li>
        </button>
    )
}

export default SearchResult;
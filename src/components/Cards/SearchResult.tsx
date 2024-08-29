import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Bookmark from '../../assets/svgs/bookmark.svg';
import BookmarkIcon from '../Icons/Bookmark';

interface Props {
    poster: string;
    title: string;
    year: string;
    id: string;
    handleClick: () => void;
}

const SearchResult: React.FC<Props> = ({ poster, title, year, id, handleClick }) => {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    return (
        <button onClick={handleClick} className="cursor-pointer transition-all hover:bg-gray-100">
            <li className="flex flex-row gap-4 px-5 py-7 border-b border-gray-300 relative">
                <img className="h-[80px] w-[80px] shrink-0 object-cover" src={poster !== 'N/A' ? poster : 'https://placehold.co/80'} alt={`${title} Movie poster`} />
                <div className="flex flex-col text-start">
                    <h3 className="text-lg font-semibold">
                        { title }
                    </h3>
                    <p className="text-md font-thin">
                        { year }
                    </p>
                </div>
                {
                    wishlistItems.some((item: Record<string, any>) => item.imdbID === id) ?
                    <div className="absolute right-5 bottom-7">
                        <BookmarkIcon size="28" stroke="#213547" />
                    </div>
                    :
                    <></>
                }
            </li>
        </button>
    )
}

export default SearchResult;
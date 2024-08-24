import React from 'react';

interface Props {
    poster: string;
    title: string;
    year: string;
    handleClick: () => void;
}

const SearchResult: React.FC<Props> = ({ poster, title, year, handleClick }) => {

    return (
        <button onClick={handleClick} className="cursor-pointer transition-all hover:bg-gray-100">
            <li className="flex flex-row gap-4 px-5 py-7 border-b border-gray-300">
                <img className="h-[80px] w-[80px] shrink-0 object-cover" src={poster !== 'N/A' ? poster : 'https://placehold.co/80'} alt={`${title} Movie poster`} />
                <div className="flex flex-col text-start">
                    <h3 className="text-lg font-semibold">
                        { title }
                    </h3>
                    <p className="text-md font-thin">
                        { year }
                    </p>
                </div>
            </li>
        </button>
    )
}

export default SearchResult;
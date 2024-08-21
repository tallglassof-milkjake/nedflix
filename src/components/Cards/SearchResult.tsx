import React from 'react';

interface Props {
    poster: string;
    title: string;
    year: string;
    handleClick: () => void;
}

const SearchResult: React.FC<Props> = ({ poster, title, year, handleClick }) => {

    return (
        <button onClick={handleClick} className="hover:scale-105 transition-all">
            <li className="flex flex-row gap-4 px-5 py-3 border border-gray-100 rounded-xl">
                <img className="w-[60px] h-[60px] object-cover" src={poster} alt={`${title} Movie poster`} />
                <div>
                    <h3>
                        { title }
                    </h3>
                    <p>
                        { year }
                    </p>
                </div>
            </li>
        </button>
    )
}

export default SearchResult;
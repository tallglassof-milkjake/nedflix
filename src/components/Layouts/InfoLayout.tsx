import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// Icons & Components
import ChevronLeft from '../../assets/svgs/chevron-left.svg';
import Bookmark from '../../assets/svgs/bookmark.svg';

interface Props {
    onClearSelected: () => void;
}

const InfoLayout: React.FC<Props> = ({onClearSelected}) => {
    const selectedResult = useSelector((state: RootState) => state.omdb.selectedResult);
    
    const handleBookmark = (): void => {
        console.log('Now we save the bookmark');
    }
    return (
        <div className="relative w-full">
            <button className="absolute w-[40px] h-[40px] flex place-items-center justify-center top-4 left-4 px-1 py-1 border border-gray-600 rounded-full transition-all shadow-md hover:shadow-lg hover:bg-gray-100" onClick={onClearSelected}>
                <img src={ChevronLeft} alt="" />
            </button>

            {/* Movie card - TODO: componentise */}

            <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row flex-nowrap pt-4">
                    <div className="w-full flex">
                        <img className="mx-auto" src={selectedResult?.Poster} alt="" />
                    </div>
                    <div className="flex flex-col px-2 py-4 gap-4">
                        <button className="absolute lg:auto w-[40px] h-[40px] flex place-items-center justify-center top-4 right-4 px-1 py-1 border border-gray-600 rounded-full transition-all shadow-md hover:shadow-lg hover:bg-gray-100" onClick={handleBookmark}>
                            <img className="w-[18px]" src={Bookmark} alt="" /> 
                            <p className="hidden lg:flex">
                                Watchlist
                            </p>
                        </button>
                        <div className="text-center">
                            <h1 className="font-semibold text-3xl">
                                {selectedResult?.Title}
                            </h1>
                        </div>
                        <div className="font-extralight flex flex-row flex-wrap justify-around place-items-center gap-1 w-full text-center">
                            <div>
                                <p className="border border-gray-600 px-2 py-1 rounded-md font-semibold">
                                    {selectedResult?.Rated}
                                </p>
                            </div>
                            <p>
                                {selectedResult?.Year}
                            </p>
                            <span className="w-[2px] h-[2px] bg-gray-600" />
                            <p>
                                {selectedResult?.Genre}
                            </p>
                            <span className="w-[2px] h-[2px] bg-gray-600" />
                            <p>
                                {selectedResult?.Runtime}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="font-medium">
                                {selectedResult?.Actors}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <p className="py-4 border-t border-gray-300 text-center">
                        {selectedResult?.Plot}
                    </p>
                </div>
                <div className="px-4">
                    <div className="flex flex-row flex-nowrap justify-around divide-x py-4 border-t border-gray-300">
                        {selectedResult?.Ratings.map((rating: Record<string, string>, index: number) => (
                            <div key={index} className="text-lg flex flex-col gap-1 w-1/3 place-items-center text-center px-2">
                                <p className="font-extralight">
                                    {rating.Value}
                                </p>
                                <p className="font-semibold text-sm">
                                    {rating.Source}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default InfoLayout;
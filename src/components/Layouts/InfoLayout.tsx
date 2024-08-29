import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';

// Icons & Components
import ChevronLeft from '../../assets/svgs/chevron-left.svg';
import Bookmark from '../../assets/svgs/bookmark.svg';

interface Props {
    onClearSelected: () => void;
}

const InfoLayout: React.FC<Props> = ({onClearSelected}) => {
    const dispatch = useDispatch();
    const selectedResult = useSelector((state: RootState) => state.omdb.selectedResult);
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const isWishlisted = wishlist.some((item: any) => item.imdbID === selectedResult?.imdbID);

    const handleBookmark = (): void => {
        if (selectedResult) {
            if (isWishlisted) {
                dispatch(removeFromWishlist(selectedResult.imdbID));
            } else {
                dispatch(addToWishlist(selectedResult));
            }
        }
    }

    return (
        <div className="relative w-full lg:h-full lg:flex flex-col overflow-auto bg-slate-100">
            {
                selectedResult 
                ?
                    <>
                        <button className="absolute w-[40px] h-[40px] lg:hidden flex place-items-center justify-center top-4 left-4 px-1 py-1 border border-gray-600 rounded-full transition-all shadow-md hover:shadow-lg hover:bg-gray-100" onClick={onClearSelected}>
                            <img src={ChevronLeft} alt="" />
                        </button>

                        {/* Movie card - TODO: componentise */}

                        <div className="flex flex-col h-full lg:gap-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row flex-nowrap pt-4">
                                <div className="w-full flex flex-1 lg:px-4">
                                    <img className="min-w-[300px] mx-auto lg:mx-0" src={selectedResult?.Poster} alt="" />
                                </div>
                                <div className="flex flex-auto flex-col px-2 py-4 gap-4">
                                    <button className={`absolute lg:static w-[40px] lg:ml-auto lg:max-w-fit lg:w-full h-[40px] flex place-items-center justify-center top-4 right-4 px-1 lg:px-7 py-1 border border-gray-600 rounded-full lg:rounded-md transition-all shadow-md hover:shadow-lg hover:bg-gray-100 ${isWishlisted ? 'bg-gray-200' : 'bg-white'}`} onClick={handleBookmark}>
                                        <img className="w-[18px]" src={Bookmark} alt="" /> 
                                        <p className="hidden lg:flex">
                                            Watchlist
                                        </p>
                                    </button>
                                    <div className="text-center lg:text-left mt-auto">
                                        <h1 className="font-semibold text-3xl">
                                            {selectedResult?.Title}
                                        </h1>
                                    </div>
                                    <div className="font-extralight flex flex-row flex-wrap justify-around lg:justify-start lg:gap-2 place-items-center gap-1 w-full text-center lg:text-left">
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
                                    <div className="text-center lg:text-left">
                                        <p className="font-medium">
                                            {selectedResult?.Actors}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4">
                                <p className="py-4 border-t border-gray-300 text-center lg:text-left">
                                    {selectedResult?.Plot}
                                </p>
                            </div>
                            <div className="px-4 lg:mt-auto">
                                <div className="flex flex-row flex-nowrap justify-around divide-x py-4 border-t border-gray-300">
                                    {selectedResult?.Ratings.map((rating: Record<string, string>, index: number) => (
                                        <div key={index} className="text-lg flex flex-col gap-1 w-1/3 place-items-center text-center lg:text-left lg:py-6 px-2">
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
                    </>
                :
                <div className="w-full h-full flex place-items-center justify-center">
                    None selected
                </div>
            }
            

        </div>
    )
};

export default InfoLayout;
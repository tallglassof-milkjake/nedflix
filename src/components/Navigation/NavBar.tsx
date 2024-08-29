import React from "react";
import Input from "../Form/Input";
import Dropdown from "../Common/Dropdown";
import TypeFilter from "../Form/TypeFilter";
import Slider from '../Form/Slider';
import Bookmark from '../../assets/svgs/bookmark.svg';

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../store/store';
import { setSearchList } from '../../store/slices/omdbSlice';

const NavBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentYearRange = useSelector((state: RootState) => state.omdb.yearRange);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

    const handleClick = () => {
        dispatch(setSearchList(wishlistItems));
    }

    return (
        <div className="w-full h-[80px] bg-slate-900  flex flex-row justify-between place-items-center px-5 py-3">
            <nav className="flex flex-row place-items-center gap-2">
                {wishlistItems && wishlistItems.length > 0 ?
                    <button className="bg-transparent hover:bg-slate-600 p-2 rounded-lg" onClick={handleClick}>
                        <img className="w-[28px] bg-transparent" src={Bookmark} alt="" /> 
                    </button>
                :
                    <></>
                }
                <Input shouldAutoFocus />
            </nav>

            {window.innerWidth <= 768 
                ?
                    <Dropdown />
                :
                    <div className="flex flex-row gap-4 place-items-center">
                        <Slider minYear={1970} maxYear={new Date().getFullYear()} currentQuery={currentYearRange} />

                        <TypeFilter />
                    </div>
            }
        </div>
    )
}

export default NavBar;
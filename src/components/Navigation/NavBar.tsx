import React from "react";
import Input from "../Form/Input";

import { useSelector } from "react-redux";
import { RootState } from '../../store/store';

const NavBar: React.FC = () => {

    const filter = useSelector((state: RootState) => state.omdb.filter);

    return (
        <div className="w-full border-b border-gray-100 flex flex-row justify-between px-8 py-3">
            <nav>
                <Input shouldAutoFocus />
            </nav>

            <div className="flex flex-row gap-4 place-items-center">
                <p>
                    Year Filter
                </p>

                <p>
                    { filter }
                </p>
            </div>
        </div>
    )
}

export default NavBar;
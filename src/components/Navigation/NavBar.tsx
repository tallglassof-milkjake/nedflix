import React from "react";
import Input from "../Form/Input";
import Dropdown from "../Common/Dropdown";
import RadioSelector from "components/Form/RadioSelector";
import Slider from '../Form/Slider';

import { useSelector } from "react-redux";
import { RootState } from '../../store/store';

const NavBar: React.FC = () => {
    const filter = useSelector((state: RootState) => state.omdb.filter);
    
    return (
        <div className="w-full h-[80px] border-b border-gray-300 flex flex-row justify-between place-items-center px-5 py-3">
            <nav>
                <Input shouldAutoFocus />
            </nav>

            {window.innerWidth <= 768 
                ?
                    <Dropdown />
                :
                    <div className="flex flex-row gap-4 place-items-center">
                        <p>
                            Year Filter
                        </p>

                        <p>
                            { filter }
                        </p>
                    </div>
            }
        </div>
    )
}

export default NavBar;
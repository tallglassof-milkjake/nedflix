import React from 'react';

interface Props {
    item: FilterItem;
    currentFilter: string;
    handleSelect: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioSelector: React.FC<Props> = ({item, currentFilter, handleSelect}) => {

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {item.options.map((option: string | number, index: number) => (
                <div className="flex flex-row gap-2 place-items-center" key={index}>
                    <input id={`radio-${option}-${index}`} type="radio" className="accent-amber-500" value={option.toString()} checked={option === currentFilter} onChange={(e) => handleSelect(e)} />
                    <label htmlFor={`radio-${option}-${index}`} className={option === currentFilter ? 'font-semibold capitalize text-gray-100' : 'font-light capitalize text-gray-100'}>
                        {option}
                    </label>
                </div>
            ))}
        </div>
    )
};

export default RadioSelector;
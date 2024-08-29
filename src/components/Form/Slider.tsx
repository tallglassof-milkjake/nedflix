import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setYearRange, searchMovies } from '../../store/slices/omdbSlice';

interface YearRangeSliderProps {
    minYear: number;
    maxYear: number;
    currentQuery: [number, number];
}

const YearRangeSlider: React.FC<YearRangeSliderProps> = ({ minYear, maxYear, currentQuery }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [yearRange, setYearRangeState] = useState<[number, number]>([minYear, maxYear]);
    const storeQuery = useSelector((state: RootState) => state.omdb.query);
    const page = useSelector((state: RootState) => state.omdb.page);

    const handleYearChange = (values: [number, number]) => {
        setYearRangeState(values);
    };

    useEffect(() => {
        dispatch(setYearRange(yearRange));
        if (storeQuery) {
            const query = storeQuery;
            dispatch(searchMovies({query, page}));
        }
    }, [yearRange, storeQuery, dispatch]);

    return (
        <div className="flex flex-col p-4">
            <label className="font-semibold text-sm text-gray-100 uppercase">Year</label>
            <div className="flex justify-between place-items-center w-full min-w-[220px]">
                <span className="font-light text-gray-100">{yearRange[0]}</span>
                <div className="min-w-[120px]">
                    <Slider
                        range
                        min={minYear}
                        max={maxYear}
                        value={yearRange}
                        onChange={(values) => handleYearChange(values as [number, number])}
                        trackStyle={[{ backgroundColor: 'gray' }]}
                        handleStyle={[
                            { borderColor: 'gray' },
                            { borderColor: 'gray' }
                        ]}
                    />
                </div>
                <span className="font-light text-gray-100">{yearRange[1]}</span>
            </div>
        </div>
    );
};

export default YearRangeSlider;
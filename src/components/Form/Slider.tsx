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

    const handleYearChange = (values: [number, number]) => {
        setYearRangeState(values);
    };

    useEffect(() => {
        dispatch(setYearRange(yearRange));
        if (storeQuery) {
            dispatch(searchMovies(storeQuery));
        }
    }, [yearRange, storeQuery, dispatch]);

    return (
        <div className="flex flex-col gap-2 p-4">
            <label className="font-semibold">Year Range</label>
            <Slider
                range
                min={minYear}
                max={maxYear}
                value={yearRange}
                onChange={(values) => handleYearChange(values as [number, number])}
                className="mt-2"
                trackStyle={[{ backgroundColor: 'red' }]}
                handleStyle={[
                    { borderColor: 'red' },
                    { borderColor: 'red' }
                ]}
            />
            <div className="flex justify-between">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
            </div>
        </div>
    );
};

export default YearRangeSlider;
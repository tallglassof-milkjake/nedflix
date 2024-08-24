// src/store/slices/omdbSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

interface OMDBState {
    searchResults: any[];
    error: string | null;
    loading: boolean;
    query: string | null;
    filter: 'movie' | 'series' | 'episode' | 'all';
    totalResults: number;
    page: number;
    yearRange: [number, number]
}

const initialState: OMDBState = {
    searchResults: [],
    error: null,
    loading: false,
    query: '',
    filter: 'all',
    totalResults: 0,
    page: 1,
    yearRange: [1970, new Date().getFullYear()]
};

export const searchMovies = createAsyncThunk(
    'omdb/searchMovies',
    async (query: string, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const { page, filter } = state.omdb;
        
        try {
            const key = import.meta.env.VITE_OMDB_API_KEY;
            let url: string = `http://www.omdbapi.com/?apikey=${key}&s=${query}&page=${page}`;
            if (filter && filter !== 'all') {
                url += `&type=${filter}`;
            }
            const response = await axios.get(url);
            const { Search, totalResults, Response } = response.data;
            console.log(response);
            if (Response === 'False') {
                return rejectWithValue('No results found');
            }

            return {
                searchResults: Search,
                totalResults: parseInt(totalResults, 10),
                page,
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const omdbSlice = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        loadMore(state) {
            state.page += 1;
        },
        resetSearch(state) {
            state.searchResults = [];
            state.totalResults = 0;
            state.page = 1;
            state.query = '';
        },
        setSearchQuery(state, action) {
            state.query = action.payload;
        },
        setFilter(state, action: PayloadAction<'all' | 'movie' | 'series' | 'episode'>) {
            state.filter = action.payload;
            state.page = 1;
            state.searchResults = [];
        },
        setYearRange(state, action: PayloadAction<[number, number]>) {
            state.yearRange = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchMovies.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.query = action.meta.arg;
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
            state.searchResults = [...state.searchResults, ...action.payload.searchResults];
            state.totalResults = action.payload.totalResults;
            state.loading = false;
        })
        .addCase(searchMovies.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    },
});

export const { loadMore, resetSearch, setSearchQuery, setFilter, setYearRange } = omdbSlice.actions;
export default omdbSlice.reducer;

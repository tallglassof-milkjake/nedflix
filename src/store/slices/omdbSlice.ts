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
    yearRange: [number, number];
    selectedId: string | null;
    selectedResult: Record<string, any> | null;
}

const initialState: OMDBState = {
    searchResults: [],
    error: null,
    loading: false,
    query: '',
    filter: 'all',
    totalResults: 0,
    page: 1,
    yearRange: [1970, new Date().getFullYear()],
    selectedId: null,
    selectedResult: null,
};

export const searchMovies = createAsyncThunk(
    'omdb/searchMovies',
    async ({query, page}: {query: string, page: number }, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const { filter } = state.omdb;
        
        try {
            const key = import.meta.env.VITE_OMDB_API_KEY;

            if (!query) return rejectWithValue('No query provided');
            
            let url: string = `http://www.omdbapi.com/?apikey=${key}&s=${query}&page=${page}`;
            
            if (filter && filter !== 'all') {
                url += `&type=${filter}`;
            }
            
            const response = await axios.get(url);
            const { Search, totalResults, Response } = response.data;
            
            if (Response === 'False') {
                return rejectWithValue('No results found');
            }

            return {
                searchResults: Search,
                totalResults: parseInt(totalResults, 10),
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchSingleResult = createAsyncThunk(
    'omdb/searchSingleResult',
    async (_, { getState, rejectWithValue }) => {
        // Access the global state
        const state = getState() as RootState;
        const { selectedId } = state.omdb;

        // Check if selectedId is available in state
        if (!selectedId) {
            return rejectWithValue('No id Available');
        }
        
        try {
            // Make the API call using the selectedId from state
            const key = import.meta.env.VITE_OMDB_API_KEY;
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}&plot=full`);
            // console.log(response);
            const { Response } = response.data;

            if (Response === 'False') {
                return rejectWithValue('No results found');
            }

            return response.data;
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
        setSearchList(state, action) {
            state.searchResults = action.payload;
        },
        resetSearch(state) {
            state.searchResults = [];
            state.totalResults = 0;
            state.page = 1;
            state.query = '';
        },
        setSearchQuery(state, action) {
            state.query = action.payload;
            state.totalResults = action.payload.totalResults;
            state.loading = false;
            state.page += 1;
        },
        setFilter(state, action: PayloadAction<'all' | 'movie' | 'series' | 'episode'>) {
            state.filter = action.payload;
            state.page = 1;
            state.searchResults = [];
        },
        setYearRange(state, action: PayloadAction<[number, number]>) {
            state.yearRange = action.payload;
        },
        setSelectedId(state, action: PayloadAction<string>) {
            state.selectedId = action.payload;
        },
        clearSelected(state) {
            state.selectedId = null;
            state.selectedResult = null;
        },
        updateTotalResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchMovies.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            if (action.meta.arg.page === 1) {
                state.query = action.meta.arg.query;
                state.searchResults = [];
            }
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
            if (state.page === 1) {
                state.searchResults = action.payload.searchResults;
            } else {
                state.searchResults = [...state.searchResults, ...action.payload.searchResults];
            }
            state.totalResults = action.payload.totalResults;
            state.loading = false;
        })
        .addCase(searchMovies.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        })
        .addCase(searchSingleResult.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchSingleResult.fulfilled, (state, action) => {
            // Handle successful result
            state.loading = false;
            // console.log(action.payload);
            state.selectedResult = action.payload; // Assuming you have a selectedResult in your state
        })
        .addCase(searchSingleResult.rejected, (state, action) => {
            // Handle errors
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { loadMore, resetSearch, setSearchQuery, setFilter, setYearRange, setSelectedId, clearSelected, setSearchList, updateTotalResults } = omdbSlice.actions;
export default omdbSlice.reducer;
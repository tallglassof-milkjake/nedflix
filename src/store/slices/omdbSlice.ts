import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

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
    selectedResultSeasons: [],
    sort: 'none',
};

// Get the VITE_OMDB_API_KEY from env variable
const key = import.meta.env.VITE_OMDB_API_KEY;

/**
 * A thunk action that performs an asynchronous movie search using the OMDB API.
 * Handles pagination, filters, and error handling.
 *
 * @param {Object} unnamed - Object containing the 
    * query @param {string}, and 
    * page @param {number}
 * 
 * @param {Object} unnamed - Redux store getState and rejectWithvalue methods
    * getState @param {Function}, Function to get current state of the store
    * rejectWithValue @param {Function}, Function to reject the promise with a specified value
 *
 * @returns {Promise<{searchResults: Movie[], totalResults: number}>} - A promise that resolves as an object with the search results and total results
 * @returns {Promise<string>} - A promise that rejects with an error string
 */
export const searchMovies = createAsyncThunk(
    'omdb/searchMovies',
    async ({query, page}: {query: string, page: number }, { getState, rejectWithValue }) => {
        // Access the state
        const state = getState() as RootState;
        const { filter } = state.omdb;
        
        try {

            // If no query provided something isn't right so return a message to the caller
            if (!query) return rejectWithValue('No query provided');
            
            const encodedQuery = encodeURI(query);
            // Build the query string
            let url: string = `http://www.omdbapi.com/?apikey=${key}&s=${encodedQuery}&page=${page}`;

            // If a filter is applied and isn;t "all" add it to the query string
            if (filter && filter !== 'all') {
                url += `&type=${filter}`;
            }
            
            // If the filter is an episode, build a different query string
            if (filter && filter === 'episode') {
                url = `http://www.omdbapi.com/?apikey=${key}&t=${query}&Season=${1}`
            }

            // Make the request
            const response = await axios.get(url);
            // Extract some results from the response
            const { Search, totalResults, Response } = response.data;
            
            // The response could return false, so we need to return a message to the caller
            if (Response === 'False') {
                return rejectWithValue('No results found');
            }

            let episodeArray = [];
            if (!Search) {
                const episodes = response.data.Episodes;
                for (let i = 0; i < episodes.length; i++) {
                    const episode = await axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${episodes[i].imdbID}`)
                    episodeArray.push(episode.data);
                }
            }
            
            // Return the results (Search || Episodes) and total results (totalResulst)
            return {
                searchResults: Search || episodeArray,
                totalResults: parseInt(totalResults, 10),
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
  * A thunk action that performs an asynchronous movie search using the OMDB API.
 * Retrieves the detailed info about a selected movie using a unique identifier (IMDb ID).
 *
 * @param {void} _ - No parameters are required for this function (TODO: is there a better way to do this?)
 * @param {Object} unnamed - Redux store getState and rejectWithValue methods
    * @param {Function} getState - Function to get current state of the store
    * @param {Function} rejectWithValue - Function to reject the promise with a specified value
 *
 * @returns {Promise<Movie>} - Promise resolves with detailed movie information
 * @returns {Promise<string>} - Promise rejects with an error string if search fails
 */
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
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}&plot=full`);
            
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

/**
 * Thunk to fetch season data from the OMDB API.
 * It iterates through the total number of seasons for a given show and retrieves the data for each season.
 * Optionally, it can fetch a specific episode if the episode parameter is provided.
 *
 * @function
 * @param {Object} params - The parameters for the API call.
    * @param {string} [params.episode] - (Optional) The episode number to fetch.
    * @param {Object} thunkAPI - The thunk API provided by Redux Toolkit.
 * @param {function} thunkAPI.getState - Function to get the current state from the Redux store.
 * @param {function} thunkAPI.rejectWithValue - Function to handle errors and reject the promise with a value.
 * @returns {Promise<Array<Object>>} - A promise that resolves with an array of season data, or rejects with an error message.
 */
export const fetchSeasons = createAsyncThunk(
    'omdb/fetchSeasons',
    async ({episode}: Partial<{ episode?: string }>, { getState, rejectWithValue}) => {
        const state = getState() as RootState;
        const { selectedResult } = state.omdb;

        let seasonsArray = [];
        try {
            const encodedQuery = encodeURI(selectedResult?.Title);
            // Iterate over the totalSeasons (seasons)
            for (let i = 0; i < selectedResult?.totalSeasons; i++) {
                let url = `http://www.omdbapi.com/?apikey=${key}&t=${encodedQuery}&plot=full&Season=${(i + 1)}`;
            
                if (episode) {
                    url += `&Episode=${episode}`;
                }
                
                const response = await axios.get(url);
                const { Response } = response.data;

                if (Response === 'False') {
                    return;
                }

                seasonsArray.push(response.data);
            }

            if (seasonsArray.length < selectedResult?.totalSeasons.length) {
                rejectWithValue('Unable to fetch all seasons');
            }
            
            return seasonsArray;
        } catch(error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk to fetch a specific episode data from the OMDB API.
 * It retrieves the data for a given episode of a specific season of a show, based on the query stored in the state.
 *
 * @function
 * @param {Object} params - The parameters for the API call.
    * @param {string} params.episode - The episode number to fetch.
    * @param {string} params.season - The season number to fetch from.
 * @param {Object} thunkAPI - The thunk API provided by Redux Toolkit.
    * @param {function} thunkAPI.getState - Function to get the current state from the Redux store.
    * @param {function} thunkAPI.rejectWithValue - Function to handle errors and reject the promise with a value.
 * @returns {Promise<Object>} - A promise that resolves with the episode data, or rejects with an error message.
 */
export const fetchEpisode = createAsyncThunk(
    'omdb/fetchEpisode',
    async ({ episode, season }: { episode: string, season: string }, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const { query } = state.omdb;
        try {
            const encodedQuery = encodeURI(query!);

            const url = `http://www.omdbapi.com/?apikey=${key}&t=${encodedQuery}&Season=${season}&Episode=${episode}`;

            const response = await axios.get(url);

            const { Response } = response.data;

            if (Response === 'False') {
                rejectWithValue('Could not find episode');
            }

            return response.data;
        } catch(error: any) {
            rejectWithValue(error.message);
        }
    }
);

/**
 * Redux slice for OMDB movie database state.
 * This slice includes reducers for loading more movies, setting search results, resetting search,
 * setting search query, applying filters, setting year range, selecting a movie, clearing selection,
 * and updating total results. 
 * 
 * Also includes extra reducers for handling asynchronous actions related to searching movies and 
 * retrieving detailed information about a selected movie.
 */
const omdbSlice = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        /**
         * Sets the sort for the search results
         */
        setSorting(state, action: PayloadAction<'none' | 'alphaAsc' | 'alphaDesc' | 'yearAsc' | 'yearDesc'>) {
            state.sort = action.payload;
        },
        /**
         * Increments the page number in the state to load more movies
         */
        loadMore(state) {
            state.page += 1;
        },

        /**
         * Sets the search results in the state.
         *
         * @param {PayloadAction<Movie[]>} action - The action containing the search results.
         */
        setSearchList(state, action: PayloadAction<Wishlist[]>) {
            state.searchResults = action.payload;
        },

        /**
         * Resets the search state to its initial values.
         */
        resetSearch(state) {
            state.searchResults = [];
            state.totalResults = 0;
            state.page = 1;
            state.query = '';
        },

        /**
         * Sets the search query, total results, loading state, and increments the page number.
         *
         * @param {PayloadAction<{query: string, totalResults: number}>} action - The action containing the search query and total results.
         */
        setSearchQuery(state, action: PayloadAction<{ query: string; totalResults: number; }>) {
            state.query = action.payload.query;
            state.totalResults = action.payload.totalResults;
            state.loading = false;
            state.page += 1;
        },

        /**
         * Sets the filter in the state and resets the page number
         *
         * @param {PayloadAction<'all' | 'movie' | 'series' | 'episode'>} action - The action containing the filter value.
         */
        setFilter(state, action: PayloadAction<'all' | 'movie' | 'series' | 'episode'>) {
            state.filter = action.payload;
            state.page = 1;
        },

        /**
         * Sets the year range in the state.
         *
         * @param {PayloadAction<[number, number]>} action - The action containing the year range.
         */
        setYearRange(state, action: PayloadAction<[number, number]>) {
            state.yearRange = action.payload;
        },

        /**
         * Sets the selected movie ID in the state.
         *
         * @param {PayloadAction<string>} action - The action containing the selected movie ID.
         */
        setSelectedId(state, action: PayloadAction<string>) {
            state.selectedId = action.payload;
        },

        /**
         * Clears the selected movie ID and selected result from the state.
         */
        clearSelected(state) {
            state.selectedId = null;
            state.selectedResult = null;
        },

        /**
         * Updates the total results in the state.
         *
         * @param {PayloadAction<number>} action - The action containing the total results.
         */
        updateTotalResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // Search movies case PENDING
        .addCase(searchMovies.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            if (action.meta.arg.page === 1) {
                state.query = action.meta.arg.query;
                state.searchResults = [];
            }
        })
        // Search movies case FULFILLED
        .addCase(searchMovies.fulfilled, (state, action) => {
            if (state.page === 1) {
                state.searchResults = action.payload.searchResults;
            } else {
                state.searchResults = [...state.searchResults, ...action.payload.searchResults];
            }
            state.totalResults = action.payload.totalResults;
            state.loading = false;
        })
        // Search movies case REJECTED
        .addCase(searchMovies.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        })
        // Search single movie case PENDING
        .addCase(searchSingleResult.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // Search single movie case FULFILLED
        .addCase(searchSingleResult.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedResult = action.payload;
        })
        // Search single movie case REJECTED
        .addCase(searchSingleResult.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Fetch seasons case PENDING
        .addCase(fetchSeasons.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // Fetch seasons case FULFILLED
        .addCase(fetchSeasons.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedResultSeasons = action.payload as any[];
        })
        // Fetch seasons case REJECTED
        .addCase(fetchSeasons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Fetch single episode case PENDING
        .addCase(fetchEpisode.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // Fetch single episode case FULFILLED
        .addCase(fetchEpisode.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedResult = action.payload;
        })
        // Fetch single episode case REJECTED
        .addCase(fetchEpisode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setSorting, loadMore, resetSearch, setSearchQuery, setFilter, setYearRange, setSelectedId, clearSelected, setSearchList, updateTotalResults } = omdbSlice.actions;
export default omdbSlice.reducer;
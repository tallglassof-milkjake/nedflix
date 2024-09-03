
export {};

declare global {
    // Global interface for movie type filter
    interface FilterItem {
        id: string;
        name: string;
        value: string | number[];
        options: string[] | number[];
    }

    // Icon props
    interface IconProps {
        stroke?: string;
        fill?: string;
        size?: string;
    }

    // Omdb reducer state
    interface OMDBState {
        searchResults: any[] | Record<string, any>[];
        error: string | null;
        loading: boolean;
        query: string | null;
        filter: 'movie' | 'series' | 'episode' | 'all';
        totalResults: number;
        page: number;
        yearRange: [number, number];
        selectedId: string | null;
        selectedResult: Record<string, any> | null;
        selectedResultSeasons: any[];
        sort: 'none' | 'alphaAsc' | 'alphaDesc' | 'yearAsc' | 'yearDesc';
    }

    // Wishlist reducer state
    interface Wishlist {
        items: Record<string, any>;
    }
}
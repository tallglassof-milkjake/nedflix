
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
}
import React from 'react';

const ChevronLeftIcon: React.FC<IconProps> = ({ stroke = '#F3F4F6', fill = 'none', size = '18' }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M15 18L9 12L15 6" 
                stroke={stroke}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ChevronLeftIcon;
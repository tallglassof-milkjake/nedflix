import React from 'react';

const CloseIcon: React.FC<IconProps> = ({ stroke = '#F3F4F6', fill = 'none', size = '18' }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke={stroke}
                fill={fill}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CloseIcon;
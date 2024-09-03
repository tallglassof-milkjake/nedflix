import React from "react";

const FilterIcon: React.FC<IconProps> = ({ stroke = '#F3F4F6', fill = 'none', size = '18' }) => {

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" 
                stroke={stroke} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default FilterIcon;
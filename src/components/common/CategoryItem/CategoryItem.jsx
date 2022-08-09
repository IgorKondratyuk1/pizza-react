import React from 'react';

const CategoryItem = ({ name, currentElemIndex, activeIndex, onItemChange }) => {
    return (
        <li className={activeIndex === currentElemIndex ? "active" : ""} onClick={() => { onItemChange(currentElemIndex) }}>{name}</li>
    )
}

export default CategoryItem;
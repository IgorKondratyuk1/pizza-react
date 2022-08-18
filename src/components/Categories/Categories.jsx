import { useState } from "react";
import CategoryItem from "../common/CategoryItem/CategoryItem";

function Categories({ categoryId, setCategoryId }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return <CategoryItem key={index} name={category} currentElemIndex={index} activeIndex={categoryId} onItemChange={setCategoryId} />
                })}

                {/* <li className={activeIndex === 0 ? "active" : ""} onClick={(e) => { onCategoryChange(0) }}>Все</li>
                <li className={activeIndex === 1 ? "active" : ""} onClick={(e) => { onCategoryChange(1) }}>Мясные</li>
                <li className={activeIndex === 2 ? "active" : ""} onClick={(e) => { onCategoryChange(2) }}>Вегетарианская</li>
                <li className={activeIndex === 3 ? "active" : ""} onClick={(e) => { onCategoryChange(3) }}>Гриль</li>
                <li className={activeIndex === 4 ? "active" : ""} onClick={(e) => { onCategoryChange(4) }}>Острые</li>
                <li className={activeIndex === 5 ? "active" : ""} onClick={(e) => { onCategoryChange(5) }}>Закрытые</li> */}
            </ul>
        </div>
    );
}

export default Categories;
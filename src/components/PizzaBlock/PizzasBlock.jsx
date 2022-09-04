import { useState } from "react";
import CategoryItem from "../common/CategoryItem/CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

export const typeNames = ["Тонке", "Традиційне"];

function PizzaBlock({ id, title, imageUrl, types, sizes, price }) {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);
    const [activeTypeIndex, setActiveTypeIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);

    const totalItems = items.reduce((total, item) => { return item.id === id ? total + item.count : total }, 0);

    const onAddToCart = () => {
        const obj = {
            id,
            title,
            imageUrl,
            price,
            type: typeNames[activeTypeIndex],
            size: sizes[activeSizeIndex]
        };

        dispatch(addItem(obj));
    }


    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map((type, index) => <CategoryItem key={index} name={typeNames[type]} currentElemIndex={index} activeIndex={activeTypeIndex} onItemChange={setActiveTypeIndex} />)
                    }
                </ul>
                <ul>
                    {
                        sizes.map((size, index) => <CategoryItem key={index} name={`${size} см.`} currentElemIndex={index} activeIndex={activeSizeIndex} onItemChange={setActiveSizeIndex} />)
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{price} $</div>
                <button className="button button--outline button--add" onClick={onAddToCart}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {
                        totalItems > 0 && <i>{totalItems}</i>
                    }

                </button>
            </div>
        </div>
    );
}

export default PizzaBlock;
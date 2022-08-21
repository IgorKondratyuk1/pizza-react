import CategoryItem from "../common/CategoryItem/CategoryItem";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from "../../redux/slices/filterSlice";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return <CategoryItem key={index} name={category} currentElemIndex={index} activeIndex={categoryId} onItemChange={(index) => { dispatch(setCategoryId(index)) }} />
                })}
                {/* <li className={activeIndex === 0 ? "active" : ""} onClick={(e) => { onCategoryChange(0) }}>Все</li> */}
            </ul>
        </div>
    );
}

export default Categories;
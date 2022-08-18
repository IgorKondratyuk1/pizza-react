import { useState, useEffect, useContext } from 'react';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import { pizzaAPI } from '../api/api';
import Pagination from '../components/common/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({ name: 'популярности (ASC)', sortProperty: 'rating' });
    const [selectedPage, setSelectedPage] = useState(1);
    const { searchValue } = useContext(SearchContext);

    useEffect(() => {
        const getParams = () => {
            const sort = sortType.sortProperty.includes('-') ? `${sortType.sortProperty.replace('-', '')}&order=desc` : `${sortType.sortProperty}&order=asc`;
            const category = categoryId > 0 ? `&category=${categoryId}` : '';
            const search = searchValue.trim() ? `&title=${searchValue}` : '';
            const page = `&page=${selectedPage}&limit=4`;

            return `sortBy=${sort}${category}${search}${page}`;
        }

        async function fetchData() {
            setIsLoading(true);
            const params = getParams();
            const response = await pizzaAPI.getPizzas(params);
            return await response;
        }

        fetchData()
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })

        window.scrollTo(0, 0);
    }, [sortType, categoryId, searchValue, selectedPage]);

    const pizzasSkeletons = [...new Array(4)].map((item, index) => <PizzaSkeleton key={index} />);
    const filteredPizzas = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
                <Sort sortType={sortType} setSortType={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? pizzasSkeletons
                        : filteredPizzas
                }
            </div>
            <Pagination onPageChange={setSelectedPage} />
        </div>
    )
}

export default Home;
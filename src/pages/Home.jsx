import { useState, useEffect } from 'react';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/common/Pagination/Pagination';
import { pizzaAPI } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/filterSlice';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // redux
    const { categoryId, sort, page, searchValue } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        const getParams = () => {
            const sortType = sort.sortProperty.includes('-') ? `${sort.sortProperty.replace('-', '')}&order=desc` : `${sort.sortProperty}&order=asc`;
            const categoryType = categoryId > 0 ? `&category=${categoryId}` : '';
            const search = searchValue.trim() ? `&title=${searchValue}` : '';
            const selectedPage = `&page=${page}&limit=4`;

            return `sortBy=${sortType}${categoryType}${search}${selectedPage}`;
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
    }, [sort, categoryId, searchValue, page]);

    const pizzasSkeletons = [...new Array(4)].map((item, index) => <PizzaSkeleton key={index} />);
    const filteredPizzas = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? pizzasSkeletons
                        : filteredPizzas
                }
            </div>
            <Pagination onPageChange={(pageNumber) => dispatch(setPage(pageNumber))} />
        </div>
    )
}

export default Home;
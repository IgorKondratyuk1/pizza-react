import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzasBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/common/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { items, status } = useSelector((state) => state.pizza);
    const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);


    const getPizzas = async () => {
        const getParams = () => {
            const sortType = sort.sortProperty.includes('-') ? `${sort.sortProperty.replace('-', '')}&order=desc` : `${sort.sortProperty}&order=asc`;
            const categoryType = categoryId > 0 ? `&category=${categoryId}` : '';
            const search = searchValue.trim() ? `&title=${searchValue}` : '';
            const page = `&page=${currentPage}&limit=4`;

            return `sortBy=${sortType}${categoryType}${search}${page}`;
        }

        const params = getParams();
        dispatch(fetchPizzas(params)); // Call asyncThunk
    }

    // If params changed and was first render
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            }, { addQueryPrefix: true });

            navigate(queryString);
        }
        isMounted.current = true;
    }, [sort, categoryId, searchValue, currentPage]);

    // If was first render, then checking url-params and save then in redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(setFilters({ ...params, sort }));
            isSearch.current = true;
        }
    }, []);

    // If was first render - request pizzas
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;

    }, [sort, categoryId, searchValue, currentPage]);

    const pizzasSkeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
    const filteredPizzas = items.filter(item => item.title.toLowerCase()
        .includes(searchValue.toLowerCase()))
        .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />
        );

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === "error"
                    ? (
                        <div className='content__error-info'>
                            <h2>Произошла ошибка 😕</h2>
                            <p>К сожалению, не удалось получить пиццы. Повторите попытку позже.</p>
                        </div>
                    )
                    : (
                        <div className="content__items">
                            {status === "loading" ? pizzasSkeletons : filteredPizzas}
                        </div>
                    )

            }
            <Pagination onPageChange={(pageNumber) => dispatch(setPage(pageNumber))} />
        </div>
    )
}

export default Home;
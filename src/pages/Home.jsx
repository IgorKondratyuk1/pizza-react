import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/common/Pagination/Pagination';
import { pizzaAPI } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // redux
    const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);

    const fetchPizzas = () => {
        const getParams = () => {
            const sortType = sort.sortProperty.includes('-') ? `${sort.sortProperty.replace('-', '')}&order=desc` : `${sort.sortProperty}&order=asc`;
            const categoryType = categoryId > 0 ? `&category=${categoryId}` : '';
            const search = searchValue.trim() ? `&title=${searchValue}` : '';
            const page = `&page=${currentPage}&limit=4`;

            return `sortBy=${sortType}${categoryType}${search}${page}`;
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
            fetchPizzas();
        }

        isSearch.current = false;

    }, [sort, categoryId, searchValue, currentPage]);



    const pizzasSkeletons = [...new Array(4)].map((item, index) => <PizzaSkeleton key={index} />);
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
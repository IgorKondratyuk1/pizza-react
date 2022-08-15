import { useState, useEffect } from 'react';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import { pizzaAPI } from '../api/api';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let res = await pizzaAPI.getPizzas();
            return await res;
        }

        fetchData()
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })

        window.scrollTo(0, 0);
    }, []);

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
                        ? [...new Array(8)].map((item, index) => {
                            return <PizzaSkeleton key={index} />
                        })
                        : items.map(pizza => {
                            return <PizzaBlock key={pizza.id} {...pizza} />
                        })
                }
            </div>
        </div>
    )
}

export default Home;
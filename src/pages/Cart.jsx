import React from 'react';
import EmptyCartBlock from '../components/Cart/EmptyCartBlock/EmptyCartBlock';
import CartBlock from '../components/Cart/CartBlock/CartBlock';
import { useSelector } from 'react-redux';

function Cart() {
    const pizzas = useSelector(state => state.cart.items);

    return (
        <div className="container container--cart">
            {
                pizzas.length > 0 ? <CartBlock /> : <EmptyCartBlock />
            }
        </div>
    );
}

export default Cart;
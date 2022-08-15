import React from 'react';
import EmptyCartBlock from '../components/Cart/EmptyCartBlock/EmptyCartBlock';
import CartBlock from '../components/Cart/CartBlock/CartBlock';

function Cart() {
    return (
        <div className="container container--cart">
            {/* <EmptyCartBlock /> */}
            <CartBlock />
        </div>
    );
}

export default Cart;
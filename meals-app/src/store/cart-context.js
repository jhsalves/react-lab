import React from 'react';

const DefaultCartContext = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
};

const CartContext = React.createContext(DefaultCartContext);

export default CartContext;
export {DefaultCartContext};
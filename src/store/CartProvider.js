import { useReducer } from 'react';
import CartContext, {DefaultCartContext} from './cart-context';

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        return {
            items: state.items.concat(action.item),
            totalAmount: state.totalAmount + (action.item.price * action.item.amount)
        }
    }
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, DefaultCartContext);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item,
        })
     };

    const removeItemFromCartHandler = id => { };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeitem: removeItemFromCartHandler
    };

    return (<CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>);
};

export default CartProvider;
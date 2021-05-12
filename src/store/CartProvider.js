import { useReducer } from 'react';
import CartContext, { DefaultCartContext } from './cart-context';

const cartReducer = (state, action) => {
    var actions = {
        add: () => {
            let items = [...state.items];
            const itemToAdd = { ...action.item };
            const item = items.find(i2 => i2.id == itemToAdd.id);
            if (!!item) {
                itemToAdd.amount += +item.amount;
                items = state.items.filter(i => i.id !== item.id);
            }
            return {
                items: items.concat(itemToAdd),
                totalAmount: state.totalAmount + (action.item.price * action.item.amount)
            }
        },
        remove: () => {
            let items = [...state.items];
            const itemIndex = items.findIndex(i2 => i2.id == action.id);
            if (itemIndex < 0) {
                return updatedState;
            }
            const existingItem = items[itemIndex];
            const totalAmount = (state.totalAmount - existingItem.price);
            items = items.filter(x => x.id != existingItem.id);
            const updatedState = {
                items: items,
                totalAmount: totalAmount
            }
            if(totalAmount <= 0){
                return updatedState;
            }
            const amount = existingItem.amount - 1;
            if (amount > 0) {
                const updatedItem = { ...existingItem, amount: amount > 0 ? amount : 0 };
                items.splice(itemIndex, 0, updatedItem);
            }
            return updatedState;
        },
        clear: () => DefaultCartContext
    }
    return actions[action.type]();
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, DefaultCartContext);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'add',
            item,
        })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'remove',
            id
        })
    };

    const clearCartHandler = () => dispatchCartAction({type:'clear'});

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>);
};

export default CartProvider;
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const [btnBumpped, setBtnBumped] = useState('');
    const numberCartItems = items.reduce((curNumber, item) => curNumber + item.amount, 0);

    const btnClasses = `${classes.button} ${btnBumpped}`;
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnBumped(classes.bump);

        const timer = setTimeout(() => {
            setBtnBumped('');
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;
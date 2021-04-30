import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
    var cartCtx = useContext(CartContext);
    var numberCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);
    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;
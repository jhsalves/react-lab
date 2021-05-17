import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitHandler = event => {
        event.preventDefault();
        var enteredAmount = +amountInputRef.current.value;
        if(enteredAmount < 1 || enteredAmount > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmount);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount"
            ref={amountInputRef}
            input={{
                id: `amount_${props.id}`,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1 and 5)</p>}
    </form>
}

export default MealItemForm;
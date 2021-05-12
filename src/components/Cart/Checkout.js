import { useRef, useState } from "react";
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const validationMapping = val => {
        const value = val.trim();
        return (isNaN(value) && !!value) || value.length === 5;
    };

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredValuesList = [enteredName,
            enteredStreet,
            enteredPostal,
            enteredCity];

        const enteredValidityList = enteredValuesList.map(validationMapping);

        const [enteredNameIsNotEmpty,
            enteredStreetIsNotEmpty,
            enteredPostalIsNotValid,
            enteredCityIsNotEmpty] = enteredValidityList;

        setFormInputValidity({
            name: enteredNameIsNotEmpty,
            street: enteredStreetIsNotEmpty,
            postalCode: enteredPostalIsNotValid,
            city: enteredCityIsNotEmpty
        });

        const enteredDataIsNotEmptyList = [enteredNameIsNotEmpty,
            enteredStreetIsNotEmpty,
            enteredPostalIsNotValid,
            enteredCityIsNotEmpty];
        const errorFound = enteredDataIsNotEmptyList.find(x => x === false);
        const formIsValid = !errorFound;

        if (formIsValid) {
            props.onConfirm({
                name: enteredName,
                street: enteredStreet,
                city: enteredStreet,
                postalCode: enteredPostal
            });
        }
    };

    const [nameControlClasses,
        streetControlClasses,
        postalCodeControlClasses,
        cityControlClasses] = Object.values(formInputValidity).map(controlValid => `${classes.control} ${!controlValid && classes.invalid}`);

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street name!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city name!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
        </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
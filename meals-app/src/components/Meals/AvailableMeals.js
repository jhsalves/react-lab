import Meals from "./Meals";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";


const AvailableMeals = props => {
    const [mealsList, setMealsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const fetchMeals = async () => {
        try {
            const mealsPromisse = await fetch('https://reactlab-44a13-default-rtdb.firebaseio.com/meals.json');
            const meals = await mealsPromisse.json();
            const mealsArray = Object
                .keys(meals)
                .map(mealId => ({
                    id: mealId,
                    ...meals[mealId]
                }));
            if (!mealsPromisse.ok) {
                throw new Error('Failed to get a response from server.');
            }
            setIsLoading(!mealsPromisse.ok);
            setMealsList(mealsArray);
        } catch(ex) {
            setIsLoading(false);
            setErrorMessage(ex.message);
        }
    }
    useEffect(() => {
        fetchMeals();
    }, []);

    if (isLoading && !errorMessage) {
        return (<section>
            <h1>Loading...</h1>
        </section>);
    }

    if (!!errorMessage) {
        return (<section>
            <h1>{errorMessage}</h1>
        </section>);
    }

    const mealsItems = mealsList.map(meal => <MealItem key={meal.id} meal={meal} />);
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsItems}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;
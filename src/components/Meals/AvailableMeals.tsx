import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../../store/cart-context";

const StyledSection = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @keyframes meals-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
}

const StyledLoading = styled.section`
  text-align: center;
  color: white;
`;

const AvailableMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await axios.get(
        "https://react-practice-1d62f-default-rtdb.firebaseio.com/meals.json"
      );

      const loadedMeals = [];

      for (const key in res.data) {
        loadedMeals.push({
          id: key,
          name: res.data[key].name,
          description: res.data[key].description,
          price: res.data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    try {
      fetchMeals();
    } catch (e: any) {
      setIsLoading(false);
      throw e;
    }
  }, []);

  return (
    <StyledSection>
      <Card>
        {isLoading && (
          <StyledLoading>
            <p>Loading...</p>
          </StyledLoading>
        )}
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </StyledSection>
  );
};

export default AvailableMeals;

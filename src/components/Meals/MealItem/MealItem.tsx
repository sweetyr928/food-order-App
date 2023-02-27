import { useContext } from "react";
import styled from "styled-components";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const StyledMeal = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  h3 {
    margin: 0 0 0.25rem 0;
  }

  .description {
    font-style: italic;
  }

  .price {
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
  }
`;

const MealItem = ({
  id,
  name,
  description,
  price,
}: {
  id: string;
  name: string;
  description: string;
  price: number;
}) => {
  const cartCtx = useContext(CartContext);

  const totalPrice = `$${price.toFixed(2)}`;

  const handleAddToCart = (amount: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <StyledMeal>
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">{totalPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={handleAddToCart} />
      </div>
    </StyledMeal>
  );
};

export default MealItem;

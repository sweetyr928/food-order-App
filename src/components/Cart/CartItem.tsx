import styled from "styled-components";

const StyledLi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #8a2b06;
  padding: 1rem 0;
  margin: 1rem 0;

  h2 {
    margin: 0 0 0.5rem 0;
    color: #363636;
  }
`;

const StyledSummary = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    font-weight: bold;
    color: #8a2b06;
  }

  .amount {
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    color: #363636;
  }
`;
const StyledActions = styled.div`
  .actions {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .actions {
      flex-direction: row;
    }
  }

  button {
    font: inherit;
    font-weight: bold;
    font-size: 1.25rem;
    color: #8a2b06;
    border: 1px solid #8a2b06;
    width: 3rem;
    text-align: center;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    margin-left: 1rem;
    margin: 0.25rem;
  }

  button:hover,
  button:active {
    background-color: #8a2b06;
    color: white;
  }
`;

const CartItem = ({
  name,
  amount,
  price,
  onRemove,
  onAdd,
}: {
  name: string;
  amount: number;
  price: number;
  onRemove: () => void;
  onAdd: () => void;
}) => {
  const totalPrice = `$${price.toFixed(2)}`;

  return (
    <StyledLi>
      <div>
        <h2>{name}</h2>
        <StyledSummary>
          <span className="price">{totalPrice}</span>
          <span className="amount">x {amount}</span>
        </StyledSummary>
      </div>
      <StyledActions>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </StyledActions>
    </StyledLi>
  );
};

export default CartItem;

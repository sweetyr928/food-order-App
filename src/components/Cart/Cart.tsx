import { useContext } from "react";
import styled from "styled-components";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext, { Item } from "../../store/cart-context";

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const StyledToTal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const StyledActions = styled.div`
  text-align: right;

  button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }

  button:hover,
  button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }

  .close {
    color: #8a2b06;
  }

  .order {
    background-color: #8a2b06;
    color: white;
  }
`;

const Cart = ({ onCloseCart }: { onCloseCart: () => void }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleItemRemove = (id: string) => {
    cartCtx.removeItem(id);
  };

  const handleItemAdd = (item: Item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  return (
    <Modal onClose={onCloseCart}>
      <StyledUl>
        {cartCtx.items.map((item: Item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={handleItemRemove.bind(null, item.id)}
            onAdd={handleItemAdd.bind(null, item)}
          />
        ))}
      </StyledUl>
      <StyledToTal>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </StyledToTal>
      <StyledActions>
        <button className="close" onClick={onCloseCart}>
          Close
        </button>
        {hasItems && <button className="order">Order</button>}
      </StyledActions>
    </Modal>
  );
};

export default Cart;

import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext, { Item } from "../../store/cart-context";
import Checkout from "./Checkout";
import axios from "axios";

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

interface ICheckout {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

const Cart = ({ onCloseCart }: { onCloseCart: () => void }) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleItemRemove = (id: string) => {
    cartCtx.removeItem(id);
  };

  const handleItemAdd = (item: Item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const submitOrder = async (userData: ICheckout) => {
    setIsSubmitting(true);
    await axios.post(
      "https://react-practice-1d62f-default-rtdb.firebaseio.com/orders.json",
      {
        user: userData,
        orderedItems: cartCtx.items,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  return (
    <Modal onClose={onCloseCart}>
      {!isSubmitting && !didSubmit && (
        <>
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
          {isCheckout && (
            <Checkout onConfirm={submitOrder} onCancel={onCloseCart} />
          )}
          {!isCheckout && (
            <StyledActions>
              <button className="close" onClick={onCloseCart}>
                Close
              </button>
              {hasItems && (
                <button className="order" onClick={handleOrder}>
                  Order
                </button>
              )}
            </StyledActions>
          )}
        </>
      )}
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && (
        <>
          <p>Successfully sent the order!</p>
          <StyledActions>
            <button className="close" onClick={onCloseCart}>
              Close
            </button>
          </StyledActions>
        </>
      )}
    </Modal>
  );
};

export default Cart;

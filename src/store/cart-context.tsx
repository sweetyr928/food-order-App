/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

export interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item: Item) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
});

export default CartContext;

import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item , amount:1})
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          close
        </button>
        {hasItem && <button className={classes.button}>order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

import React from "react";
import moment from "moment";
import styles from "./Order.module.css";
import CartItem from "../../Checkout/CartItem/CartItem";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className={styles.order}>
      <h2>Order</h2>
      <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className={styles.order__id}>
        <small>{order.id}</small>
      </p>
      {order.cart?.map((item, index) => (
        <CartItem
          key={index}
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          quantity={item.quantity ? item.quantity : 1}
        />
      ))}
      <div className={styles.order__total}>
        <div className={styles.order__location}>
          <p>{order.address ? order.address : ""}</p>
          <p>{order.contact ? order.contact : ""}</p>
        </div>
        <CurrencyFormat
          renderText={(value) => <h3>Order Total: {value}</h3>}
          decimalScale={2}
          value={order.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={String.fromCharCode(8377)}
        />
      </div>
    </div>
  );
};

export default Order;

import { useSession } from "next-auth/client";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../../../helpers/slices/cartSlice";
import CartItem from "./CartItem/CartItem";
import styles from "./Checkout.module.css";
import Subtotal from "./Subtotal/Subtotal";

const Checkout = () => {
  // const [{ cart, user }] = useStateValue();
  const [session] = useSession();
  const cart = useSelector(selectItems);
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__items}>
        <img
          className={styles.checkout__banner}
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg"
          alt="amazon_banner"
        />
        <div className={styles.checkout__title}>
          <h2>Hello, {session?.email}</h2>
          <h2>Shopping Cart</h2>
        </div>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
            details={item.details}
            quantity={item.quantity}
            hideButton={true}
          />
        ))}
      </div>
      <div className={styles.checkout__subtotal}>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;

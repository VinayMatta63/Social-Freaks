import { Link } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { cartSum, cartTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import CartItem from "../CartItem/CartItem";
import axios from "../../axios";
import styles from "./Payment.module.css";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [{ cart, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${cartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  const handleSubmit = async (e) => {
    if (address === "" || contact === "") {
      alert("Address and Contact are required");
    } else {
      e.preventDefault();
      setProcessing(true);

      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
              address: address,
              contact: contact,
            });

          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch({
            type: "EMPTY_CART",
          });
          history.replace("/thanks");
        })
        .catch(() => setProcessing(false));
    }
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className={styles.payment}>
      <div className={styles.payment__container}>
        <h1>
          Checkout (<Link to="/checkout">{cartSum(cart)} items</Link>)
        </h1>
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={styles.payment__address}>
            <p>{user?.email}</p>
            <p>
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </p>
            <p>
              <input
                type="phone"
                placeholder="Contact"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
              />
            </p>
          </div>
        </div>
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={styles.payment__items}>
            {cart.map((item, index) => (
              <CartItem
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                quantity={item.quantity}
                hideButton={true}
              />
            ))}
          </div>
        </div>
        <div className={styles.payment__section}>
          <div className={styles.payment__title}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.payment__details}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className={styles.payment__priceContainer}>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={cartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={String.fromCharCode(8377)}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  className={styles.payment__buyNow}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

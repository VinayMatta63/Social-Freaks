import Link from "next/link";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CartItem from "../CartItem/CartItem";
import axios from "../../axios";

import {
  cartSum,
  cartTotal,
  emptyCart,
  selectItems,
} from "../../../../helpers/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { db } from "../../../../firebase";
import styled from "styled-components";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [session] = useSession();
  const cart = useSelector(selectItems);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const history = useRouter();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/api/server?total=${cartTotal(cart) * 100}`,
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
          db.collection("orders").doc(paymentIntent.id).set({
            cart: cart,
            email: session.user.email,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            address: address,
            contact: contact,
          });

          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch(emptyCart());
          history.push("/shop/thanks");
        })
        .catch(() => setProcessing(false));
    }
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <Container>
      <div>
        <Head>
          Checkout (
          <Link href="/shop/checkout">{`${cartSum(cart)} items`}</Link>)
        </Head>
        <PaymentSection>
          <PaymentTitle>
            <h3>Delivery Address</h3>
          </PaymentTitle>
          <Box>
            <p>{session.user.email}</p>
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
          </Box>
        </PaymentSection>
        <PaymentSection>
          <PaymentTitle>
            <h3>Review items and delivery</h3>
          </PaymentTitle>
          <Box>
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
          </Box>
        </PaymentSection>
        <PaymentSection>
          <PaymentTitle>
            <h3>Payment Method</h3>
          </PaymentTitle>
          <Box>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <PriceContainer>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={cartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={String.fromCharCode(8377)}
                />
                <Button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </Button>
              </PriceContainer>
              {error && <div>{error}</div>}
            </form>
          </Box>
        </PaymentSection>
      </div>
    </Container>
  );
};

export default Payment;
const Container = styled.div`
  background-color: white;
`;

const Head = styled.h1`
  text-align: center;
  padding: 10px;
  font-weight: 400;
  background-color: rgb(234, 237, 237);
  border: 1px solid lightgray;
`;

const PaymentSection = styled.div`
  display: flex;
  padding: 20px;
  margin: 0 20px;
  border-bottom: 1px solid lightgray;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PaymentTitle = styled.div`
  flex: 0.2;
  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;
const Box = styled.div`
  flex: 0.8;
`;
const PriceContainer = styled.div`
  margin-top: 40px;
`;
const Button = styled.button`
  margin: 40px;
  font-size: 13px;
  background-color: #f0c14b;
  border-radius: 2px;
  width: 100px;
  height: 40px;
  border: solid 1px;
  border-color: #a88734 #9c7e31 #846a29;
  color: #111;
  cursor: pointer;
  :hover {
    background-color: #e2b33c;
  }
`;

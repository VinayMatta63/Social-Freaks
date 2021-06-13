import { useSession } from "next-auth/client";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../../../helpers/slices/cartSlice";
import CartItem from "./CartItem/CartItem";
import Subtotal from "./Subtotal/Subtotal";
import styled from "styled-components";

const Checkout = () => {
  // const [{ cart, user }] = useStateValue();
  const [session] = useSession();
  const cart = useSelector(selectItems);
  return (
    <Container>
      <Items>
        <Img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg"
          alt="amazon_banner"
        />
        <Title>
          <HeadTitle>Hello, {session.user.name}</HeadTitle>
          <HeadTitle>Shopping Cart</HeadTitle>
        </Title>
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
      </Items>
      <div>
        <Subtotal />
      </div>
    </Container>
  );
};

export default Checkout;

const Container = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const Items = styled.div``;
const Title = styled.div`
  margin-right: 10px;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;

const Img = styled.img`
  margin-bottom: 10px;
  width: 100%;
`;

const HeadTitle = styled.h2`
  margin-bottom: 10px;
`;

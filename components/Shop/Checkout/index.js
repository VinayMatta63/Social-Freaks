import { useSession } from "next-auth/client";
import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../../../helpers/slices/cartSlice";
import CartItem from "./CartItem/CartItem";
import Subtotal from "./Subtotal/Subtotal";
import styled from "styled-components";

const Checkout = () => {
  const [session] = useSession();
  const cart = useSelector(selectItems);
  return (
    <Container>
      <Items>
        <Img
          src="https://images.unsplash.com/photo-1567752588693-ad10a647c5a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Banner"
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
  max-height: 200px;
`;

const HeadTitle = styled.h2`
  margin-bottom: 10px;
`;

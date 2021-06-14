import React from "react";
import moment from "moment";
import CartItem from "../../Checkout/CartItem/CartItem";
import CurrencyFormat from "react-currency-format";
import styled from "styled-components";

const Order = ({ id, order }) => {
  return (
    <Container>
      <h2>Order</h2>
      <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
      <Id>
        <small>{id}</small>
      </Id>
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
      <Total>
        <Location>
          <p>{order.address ? order.address : ""}</p>
          <p>{order.contact ? order.contact : ""}</p>
        </Location>
        <CurrencyFormat
          renderText={(value) => <h3>Order Total: {value}</h3>}
          decimalScale={2}
          value={order.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={String.fromCharCode(8377)}
        />
      </Total>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  padding: 40px;
  margin: 20px;
  background-color: white;
  border: 1px solid lightgray;
  position: relative;
  @media (max-width: 600px) {
    margin: 10px;
    padding: 10px;
  }
`;
const Id = styled.p`
  position: absolute;
  top: 40px;
  right: 20px;
  @media (max-width: 600px) {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 10px;
  }
`;

const Total = styled.div`
  justify-content: space-between;
  display: flex;
  font-weight: 500;
  text-align: right;
  @media (max-width: 600px) {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 10px;
  }
`;

const Location = styled.div`
  text-align: left;
`;

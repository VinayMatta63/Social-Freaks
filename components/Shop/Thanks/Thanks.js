import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Thanks = () => {
  return (
    <Container>
      <ThanksHead>Thank you for Ordering.</ThanksHead>
      <Img src="https://image.flaticon.com/icons/png/512/487/487932.png" />
      <Link href="/shop/orders">
        <Button>View Orders</Button>
      </Link>
    </Container>
  );
};

export default Thanks;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: auto;
  margin-top: 30px;

  @media (max-width: 600px) {
    width: 80%;
  }
`;
const ThanksHead = styled.h1`
  font-size: 35px;

  @media (max-width: 600px) {
    font-size: 30px;
    text-align: center;
  }
`;

const Img = styled.img`
  margin: 30px;
  width: 40%;
  height: 40%;
`;
const Button = styled.button`
  margin: 10px;
  font-size: 13px;
  background-color: #f0c14b;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: solid 1px;
  border-color: #a88734 #9c7e31 #846a29;
  color: #111;
  cursor: pointer;
  :hover {
    background-color: #e2b33c;
  }
`;

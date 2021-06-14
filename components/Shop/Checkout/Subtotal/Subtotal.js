import React from "react";
import CurrencyFormat from "react-currency-format";
import { cartSum, cartTotal } from "../../../../helpers/slices/cartSlice";
import { selectItems } from "../../../../helpers/slices/cartSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

const Subtotal = () => {
  const cart = useSelector(selectItems);
  const history = useRouter();
  const proceedToPay = () => {
    if (cart.length > 0) {
      history.push("/shop/payment");
    } else {
      alert("Cart is Empty");
    }
  };
  return (
    <Container>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cartSum(cart)} items):
              <strong style={{ marginLeft: "10px" }}>{value}</strong>
            </p>
            <Gift>
              <Input type="checkbox" />
              This order contains a gift
            </Gift>
          </>
        )}
        decimalScale={2}
        value={cartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={String.fromCharCode(8377)}
      />
      <Button onClick={proceedToPay}>Proceed to Checkout</Button>
    </Container>
  );
};

export default Subtotal;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 180px;
  padding: 20px;
  background-color: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;
  font-size: 17px;
  margin-left: 10px;
  @media (max-width: 769px) {
    width: 200px;
  }
  @media (max-width: 600px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Gift = styled.small`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  height: 35px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #3fb497;
  border: none;
  outline: none;
  color: #fafafa;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  :hover {
    background-color: #4bdab6;
  }
`;
const Input = styled.input`
  margin-right: 10px;
`;

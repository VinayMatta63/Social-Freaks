import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../../helpers/slices/cartSlice";
import { Rating } from "@material-ui/lab";
import styled from "styled-components";

const CartItem = ({
  id,
  image,
  title,
  rating,
  price,
  hideButton,
  quantity,
}) => {
  const dispatch = useDispatch();
  const removeCart = () => {
    dispatch(
      removeFromCart({
        id: id,
      })
    );
  };
  const addCart = () => {
    dispatch(
      addToCart({
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: 1,
      })
    );
  };

  return (
    <Container>
      <Img src={image} alt="" />
      <CartInfo>
        <p>{title}</p>
        <p>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{`${price} * ${quantity}`}</strong>
        </p>
        <p>
          <Rating value={rating} readOnly />
        </p>
        {hideButton && (
          <div>
            <Button onClick={removeCart}>Remove from Cart</Button>
            <Button onClick={addCart}>Add to Cart</Button>
          </div>
        )}
      </CartInfo>
    </Container>
  );
};

export default CartItem;
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  font-size: 18px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 1rem;
    align-items: center;
    text-align: center;
  }
`;
const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    font-size: 1rem;
    align-items: center;
    text-align: center;
  }
`;
const Img = styled.img`
  max-height: 200px;
  width: 300px;
  object-fit: contain;
  margin-bottom: 15px;
  @media (max-width: 769px) {
    width: 140px;
    margin-right: 10px;
  }
`;
const Button = styled.button`
  background-color: #3fb497;
  border: none;
  outline: none;
  color: #fafafa;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  margin-top: 10px;
  margin-right: 20px;
  :hover {
    background-color: #4bdab6;
  }
  @media (max-width: 769px) {
    width: 130px;
    margin-top: 7px;
    margin-right: 10px;
    font-size: 11px;
  }
  @media (max-width: 600px) {
    width: 120px;
    margin-top: 5px;
    font-size: 11px;
    margin-bottom: 3px;
    padding: 4px;
  }
`;

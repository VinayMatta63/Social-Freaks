import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectProduct } from "../../../helpers/slices/detailsSlice";
import { addToCart } from "../../../helpers/slices/cartSlice";

const Details = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();

  const addCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        quantity: parseInt(quantity),
      })
    );
    router.push("/shop");
  };

  return (
    <Container>
      <Img src={product.image} />
      <DetailsInfo>
        <Title>{product.title}</Title>
        <Price>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{product.price}</strong>
        </Price>

        <p>
          <Rating name="read-only" value={product.rating} readOnly />
        </p>
        <DetailsArray>
          {product.details?.map((detail) => (
            <p>-{detail}</p>
          ))}
        </DetailsArray>
        <Quantity>
          Quantity:
          <Input
            type="number"
            defaultValue={1}
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Quantity>

        <Button onClick={addCart}>Add to Cart</Button>
      </DetailsInfo>
    </Container>
  );
};

export default Details;
const Container = styled.div`
  font-size: 25px;
  margin-top: 50px;
  display: flex;
  margin: auto;
  background-color: white;
  height: 70vh;
  max-width: 1300px;
  font-weight: 700;
  @media (max-width: 769px) {
    font-size: 20px;
    height: 80vh;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
    margin: 10px;
    padding-bottom: 10px;
  }
`;

const Img = styled.img`
  margin-right: 30px;
  height: 70%;
  width: 30%;
  align-self: center;
  margin-left: 30px;
  object-fit: contain;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const DetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  @media (max-width: 600px) {
    align-items: center;
  }
`;

const Title = styled.p`
  font-size: 30px;
  margin-bottom: 25px;
  @media (max-width: 769px) {
    font-size: 20px;
    margin-top: 20px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
`;

const Price = styled.p`
  margin-bottom: 20px;
`;
const DetailsArray = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
  @media (max-width: 769px) {
    font-size: 13px;
  }
  @media (max-width: 600px) {
    padding-left: 10px;
    font-size: 10.5px;
  }
`;

const Quantity = styled.div`
  margin-bottom: 10px;
`;
const Input = styled.input`
  margin-left: 20px;
  padding: 10px;
  font-size: 18px;
  width: 60px;
  @media (max-width: 769px) {
    margin-left: 10px;
    padding: 5px;
    font-size: 13px;
    width: 20px;
  }
`;
const Button = styled.button`
  background-color: #3fb497;
  border: none;
  outline: none;
  color: #fafafa;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  align-self: center;
  padding: 10px;
  font-size: 13px;
  width: 15%;
  :hover {
    background-color: #4bdab6;
  }
  @media (max-width: 769px) {
    font-size: 11px;
    width: fit-content;
    align-self: center;
    margin-top: -35px;
  }
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

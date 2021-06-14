import React from "react";
import styled from "styled-components";
import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../helpers/slices/detailsSlice";

const Product = ({ id, title, image, price, rating, details }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const redirect = () => {
    const product = {
      id: id,
      title: title,
      image: image,
      price: price,
      rating: rating,
      details: details,
    };
    dispatch(addProduct(product));

    router.push("/shop/details");
  };

  return (
    <Container onClick={redirect}>
      <ProductInfo>
        <p>{title}</p>
        <ProductPrice>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{price}</strong>
        </ProductPrice>
        <ProductRating>
          <Rating name="read-only" value={rating} readOnly />
        </ProductRating>
      </ProductInfo>

      <Img src={image} />

      <div>
        <Button>Details</Button>
      </div>
    </Container>
  );
};

export default Product;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  align-items: center;
  justify-content: space-evenly;
  margin: 5px;
  padding: 20px;
  max-height: 350px;
  min-width: 100px;
  max-width: 400px;
  font-weight: 600;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  will-change: transform;
  border: 2px solid white;
  cursor: pointer;
  :hover {
    transform: translateY(-20px);
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 769px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ProductInfo = styled.div`
  flex: 0.4;
  height: 100px;
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  margin-top: 5px;
`;

const ProductRating = styled.div`
  font-size: 18px;
  margin-top: 5px;
`;

const Img = styled.img`
  flex: 0.4;
  max-height: 180px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 8px;
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
  :hover {
    background-color: #4bdab6;
  }
`;

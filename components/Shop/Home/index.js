import React from "react";
import styled from "styled-components";
import Product from "./Product/Product";
import SwiftSlider from "react-swift-slider";

const Home = ({ products }) => {
  // const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const sliderArray = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    },
    {
      id: "2",
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/MI/Final/MI_Gw_1500x600._CB659658858_.jpg",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
    },
    {
      id: "5",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg",
    },
    {
      id: "6",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg",
    },
    {
      id: "7",
      src: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg",
    },
  ];
  return (
    <HomeBox>
      <CloneText>SF SHOPPING PLATFORM</CloneText>
      <SwiftSlider
        data={sliderArray}
        height={600}
        showDots={false}
        interval={3500}
      />

      <Homes>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            details={[product.description]}
            price={Math.round(product.price * 70)}
            rating={Math.floor(Math.random() * 6)}
            image={product.image}
          />
        ))}
      </Homes>
    </HomeBox>
  );
};

export default Home;

const Homes = styled.div`
  position: relative;
  margin-top: -300px;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 600px) {
    margin-top: -100px;
  }
`;
const CloneText = styled.p`
  margin: 0;
  padding: 8px;
  background: #3fb497;
  text-align: center;
  color: rgba(255, 255, 255, 0.884);
  font-weight: 500;
  @media (max-width: 769px) {
    font-size: small;
  }
`;

const HomeBox = styled.div`
  width: 100vw;
`;

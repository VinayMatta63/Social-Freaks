import React from "react";
import styled from "styled-components";
import Product from "./Product/Product";
import SwiftSlider from "react-swift-slider";

const Home = ({ products }) => {
  // const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const sliderArray = [
    {
      id: "1",
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/Feb/EN/1500x600_Hero-Tall_NP._CB660400564_.jpg",
    },
    {
      id: "2",
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/MI/Final/MI_Gw_1500x600._CB659658858_.jpg",
    },
    {
      id: "3",
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img2020/fashion/WA_2020/StyleBazaar21/gateway/SB_PC_BUNK_50._CB660443097_.jpg",
    },
    {
      id: "4",
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/HFC/April20/Gateway/DesktopHero_HFC_1500x600_Recharge1._CB414105779_.jpg",
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
      <CloneText>AMAZON CLONE BY:- VINAY MATTA</CloneText>
      <SwiftSlider
        data={sliderArray}
        height={600}
        showDots={false}
        interval={3500}
      />

      <Homes>
        {products.map((product) => (
          <Product
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
  /* align-items: center; */
  justify-content: center;
  @media (max-width: 600px) {
    margin-top: -100px;
  }
`;
const CloneText = styled.p`
  margin: 0;
  padding: 8px;
  background: #1a2536f6;
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

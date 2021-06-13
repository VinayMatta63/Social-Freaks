import React from "react";
import styled from "styled-components";
import Product from "./Product/Product";
import SwiftSlider from "react-swift-slider";

const Home = () => {
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
      <HomeContainer>
        <CloneText>AMAZON CLONE BY:- VINAY MATTA</CloneText>
        <SwiftSlider
          data={sliderArray}
          height={600}
          showDots={false}
          interval={3500}
        />
        <Homes>
          <HomeRow>
            <Product
              id={"12cbe1"}
              title={"OPPO Reno5 Pro 5G (Starry Black, 8GB RAM, 128GB Storage)"}
              details={[
                "3D Borderless Sense Screen | AI Highlight Video (Ultra Night Video + Live HDR) | Super AMOLED Display",
                "64MP + 8MP + 2MP + 2MP | 32MP Front Camera",
                "Innovative 65W SuperVOOC 2.0 flash charging brings the 4350 mAh battery,5 minutes charging & 4hours of video playback, fully charging in 30 minutes",
                "16.64 cm (6.55 inch) Full HD+ Display with 2400x1080 resolution",
                "Color OS 11.1 based on Android v11.0 operating system with 2.6GHz MediaTek Dimensity 1000+ (MT6889) Processor, ARM G77 MC9 836 MHz",
              ]}
              price={35900}
              rating={4}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/8145DElqceL._SL1500_.jpg"
              }
            />

            <Product
              id={"12cbe4"}
              title={
                "Solimo Waves 100% Cotton Double Bedsheet with 2 Pillow Covers, Green"
              }
              details={[
                "Premium 100% cotton double bedsheet",
                "Large size to make it easy to tuck-in below the bed",
                "Long-lasting and luxuriously soft 144 TC bedsheet",
                "Colour fade resistant for all-season use",
                "Light weight and easy to wash at home",
                "Size: Bedsheet - 90 inch x 100 inch or 228 cm x 254 cm, Pillow Cover - 18 inch x 27 inch or 46 cm x 68 cm",
                "Pack Contents – 1 double bedsheet with 2 pillow covers",
              ]}
              price={759}
              rating={5}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/A19VX9R5aUL._SL1500_.jpg"
              }
            />
            <Product
              id={"12cbe2"}
              title={
                "Lenovo Ideapad Slim 3i Intel Core i5 10th Gen 15.6 (8GB/1TB+256GB SSD)"
              }
              details={[
                "Processor: 10th Gen Intel Core i5 (i5-1035G1) | Speed: 1.0 GHz (Base) - 3.6 GHz (Max) | 4 Cores | 6MB Cache",
                "OS: Pre-Loaded Windows 10 Home with Lifetime Validity",
                "Memory and Storage: 8GB RAM DDR4-2666 (4GB+4GB), Upgradable up to 12GB | 1TB HDD",
                "Display: 15.6 inch Full HD (1920x1080) | Anti-Glare",
                "Design: 1.99 cm Thin and 1.85 kg Light | Narrow Bezel | Battery Life: 5 Hours | Rapid Charge (Up to 80% in 1 Hour)",
                "Camera (Built-in): 0.3 MP with Privacy Shutter | Fixed Focus | Integrated Dual Array Microphone",
                "Audio: 2 x 1.5W Stereo Speakers | HD Audio | Dolby Audio",
              ]}
              price={50990}
              rating={3}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/61Dw5Z8LzJL._SL1000_.jpg"
              }
            />
            <Product
              id={"12cbe3"}
              title={
                "Whirlpool 265 L 3 Star Inverter Double Door Refrigerator (Black Sparkle, Convertible)"
              }
              details={[
                "Important note : This product is 4-star rated as per 2019 BEE rating and 3-star rated as per 2020 BEE rating",
                "Frost-free refrigerator; 265 litres capacity. Pedestal : No",
                "Energy Rating: 3 Star",
                "Warranty: 1 year on product, 10 years on compressor",
                "Adaptive Intelligence Technology :(AI) Microprocessor and 3 Intellisensors sense Load, Weather Conditions and Usage Patterns ensuring optimum cooling for long-lasting freshness.",
                "IntelliSense INVERTER TECHNOLOGY - Auto-Connect to Home Inverter. It efficiently adapts the cooling according to internal load. It reduces energy consumption and ensures matchless performances.",
              ]}
              price={24990}
              rating={4}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/71PpAFGSYyL._SL1500_.jpg"
              }
            />
          </HomeRow>
          <HomeRow>
            <Product
              id={"12cbe5"}
              title={"Fossil Analog Watch - BQ3181"}
              details={[
                "Dial Color: Rose Gold, Case Shape: Round",
                "Band Color: Rose Gold, Band Material: Stainless Steel",
                "Watch Movement Type: Quartz, Watch Display Type: Analog",
                "Case Material: Stainless Steel, Case Diameter: 34 millimeters",
                "2 years international warranty",
                "Remove plastic at crown to start the watch",
              ]}
              price={6445}
              rating={5}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/71Z5u3qq--L._UL1500_.jpg"
              }
            />
            <Product
              id={"12cbe6"}
              title={
                "VSK Bean Bag XXXL Sofa Mudda Cover Black (Without Beans) Cover only"
              }
              details={[
                "Pack Contents : 1 Sofa Mudda Bean Bag Cover Without Beans",
                "Double stitched bean bag cover for extra strength; Beans Requirement: Xl : 1kg XXL : 1.5 Kg, XXXL : 2 Kg.",
                "Please note that this is only a bean bag cover and you need to purchase beans refill separately to be filled into this bean bag cover.",
                "Get your drawing room study room classy with vsk bean bags",
                "It's vsk brand bean bag. Color and quality different to others",
              ]}
              price={889}
              rating={4}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/51QO4iATxCL._SL1088_.jpg"
              }
            />
            <Product
              id={"12cbe6"}
              title={
                "Asian Paints Beautiful Hanging and Wallstickers(62.38cm*30.48cm)"
              }
              details={[
                "Use in bedroom, living room, playing room, kid's room to enhance your living spaces instantly",
                "Material : Plastic Stencil",
                "Size: 62.38cm * 30.48cm",
                "Fashion for your walls",
              ]}
              price={650}
              rating={5}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/61NN0VfDttL._SL1100_.jpg"
              }
            />
            <Product
              id={"12cbe7"}
              title={
                "Park Avenue Men's Plain Regular fit T-Shirt (Medium Blue 90)"
              }
              details={[
                "Care Instructions: Machine Wash",
                "Fit Type: Regular Fit",
                "Color name: Dark Blue",
                "Material: Cotton",
                "Pattern: Plain",
                "Half Sleeve",
                "Machine Wash",
              ]}
              price={151}
              rating={4}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/91U8XTcOz-L._UL1500_.jpg"
              }
            />
          </HomeRow>
          <HomeRow>
            <Product
              id={"12cbe9"}
              title={
                "Canon PIXMA MG2577s All-in-One Inkjet Colour Printer (Blue/White)"
              }
              details={[
                "Printer Type - Inkjet; Functionality - All-in-One (Print, Scan, Copy); Printer Output - Color",
                "Connectivity-USB; Compatibility: Windows 8 / Windows 7 / Window Vista / Windows XP, Mac OS X v10.6.8. Auto Power On",
                "Pages per minute - 8.0 ipm (Black), 4.0 ipm (Colour); Cost per page - Rs.7 (Black), Rs.9 (Color) - As per ISO standards (Cost per page will be higher for printing photos)",
                "Page Yield: PG745s-100pgs, CL746s-100pgs- As per ISO standards. (Page yield is based on the consumption data from the succeeding ink cartridge but not the first ink cartridge. Yield will be lesser while printing photos)",
              ]}
              price={2899}
              rating={3}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/61fWihdEk%2BL._SL1495_.jpg"
              }
            />
            <Product
              id={"12cbe10"}
              title={
                "Sony Bravia 138.8 cm (55 inches) 4K Ultra HD Smart LED TV KD-55X7002G (Black)"
              }
              details={[
                "Resolution: 4K Ultra HD (3840 x 2160) | Refresh Rate: 50 hertz",
                "Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices",
                "Sound output: 20 Watts Output | Bass Reflex speakers | Dolby Atmos | TV MusicBox",
                "Smart TV Features: Android TV | Voice Search | Google Play | Chromecast | Netflix Recommended | Amazon Prime Video | HDR Gaming",
                "Display: X1 | 4K X-Reality Pro | Motionflow XR",
                "Warranty Information : 1 year comprehensive warranty and 1 year additional warranty on panel provided by Sony from date of purchase",
              ]}
              price={57790}
              rating={5}
              image={
                "https://images-na.ssl-images-amazon.com/images/I/81Nw2ifyBzL._SL1500_.jpg"
              }
            />
          </HomeRow>
        </Homes>
      </HomeContainer>
    </HomeBox>
  );
};

export default Home;

const HomeRow = styled.div`
  display: flex;
  z-index: 1;
  margin-left: 5px;
  margin-right: 5px;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;
const Homes = styled.div`
  position: relative;
  margin-top: -300px;
  z-index: 100;
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
const HomeContainer = styled.div``;
const HomeBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
`;

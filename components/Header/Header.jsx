import Image from "next/image";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import {
  ExpandMore,
  Flag,
  Home,
  NotificationsRounded,
  People,
  PlayArrow,
  ShoppingCart,
  Sms,
} from "@material-ui/icons";
import NavIcon from "./NavIcon";
import { IconButton } from "@material-ui/core";
import { signout } from "next-auth/client";
const Header = () => {
  return (
    <Container>
      <Logo>
        <Image
          src="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
          width={60}
          height={60}
          layout="fixed"
        />
        <InputBox>
          <Icon />
          <Input type="text" placeholder="Search..." />
        </InputBox>
      </Logo>

      <NavBox>
        <NavIcon Icon={Home} />
        <NavIcon Icon={Flag} />
        <NavIcon Icon={PlayArrow} />
        <NavIcon Icon={ShoppingCart} />
        <NavIcon Icon={People} />
      </NavBox>

      <Icons>
        {/* <Image src="" width="" height="" layout="" /> */}
        <Name onClick={signout}>Vinay Matta</Name>
        <IconBox>
          <IconButton>
            <Sms style={{ color: "lightgray" }} />
          </IconButton>
          <IconButton>
            <NotificationsRounded style={{ color: "lightgray" }} />
          </IconButton>
          <IconButton>
            <ExpandMore style={{ color: "lightgray" }} />
          </IconButton>
        </IconBox>
      </Icons>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  background-color: #fafafa;
  padding: 10px;
  height: 10vh;
  position: sticky;
  z-index: 101;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled(SearchIcon)`
  margin: 0 5px;
  color: gray;
`;

const NavBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const InputBox = styled.div`
  background-color: #fff;
  display: flex;
  margin-left: 15px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 3px;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.p`
  font-weight: 500;
  font-size: 18px;
  padding-right: 15px;
  @media (max-width: 500px) {
    padding-right: 5px;
    font-size: 15px;
  }
`;

const IconBox = styled.div`
  @media (max-width: 868px) {
    display: none;
  }
`;

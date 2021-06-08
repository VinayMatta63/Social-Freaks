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
import { signout, useSession } from "next-auth/client";
import { useState } from "react";
const Header = () => {
  const [session] = useSession();
  const [enter, setEnter] = useState();
  return (
    <Container>
      <Logo>
        <Img
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
        <Img src={session.user.image} width={50} height={50} layout="fixed" />
        <User>
          <Name
            onMouseEnter={() => setEnter(true)}
            enter={enter}
            onClick={() => setEnter(!enter)}
          >
            {session.user.name}
          </Name>
          <Signout
            onClick={signout}
            enter={enter}
            onMouseLeave={() => setEnter(false)}
          >
            Signout
          </Signout>
        </User>

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
  box-shadow: rgba(0, 0, 0, 0.205) 0px 4px 6px -2px;
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
  padding: 0;
  padding-right: 15px;
  margin-left: 5px;
  z-index: 10;
  color: #048604;
  @media (max-width: 500px) {
    padding-right: 5px;
    font-size: 15px;
  }
  transition-duration: 0.3s;
  ${(props) => props.enter && "transform:translateY(-15px);"}
`;

const IconBox = styled.div`
  @media (max-width: 868px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signout = styled.span`
  position: absolute;
  cursor: pointer;
  background-color: #4bdab6;
  padding: 3px 12px;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  transition-duration: 0.3s;
  visibility: hidden;
  ${(props) => props.enter && "transform:translateY(10px);visibility:visible;"};
`;

const Img = styled(Image)`
  border-radius: 50%;
`;

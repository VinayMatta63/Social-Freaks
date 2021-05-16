import Image from "next/image";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import {
  Flag,
  Home,
  People,
  PlayArrow,
  ShoppingCart,
} from "@material-ui/icons";
import NavIcon from "./NavIcon";
const Header = ({ deviceType }) => {
  return (
    <Container>
      <Logo>
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
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
        <p>Vinay Matta</p>
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

const Icons = styled.div``;

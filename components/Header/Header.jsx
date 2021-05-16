import Image from "next/image";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
const Header = () => {
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
          <Input type="text" placeholder="Search Social" />
        </InputBox>
      </Logo>
      <Nav></Nav>
      <Icons></Icons>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const Nav = styled.div``;
const Icons = styled.div``;

const Input = styled.input`
  border: none;
  outline: none;
`;
const InputBox = styled.div`
  display: flex;
  margin-left: 30px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 5px;
`;
const Icon = styled(SearchIcon)`
  margin: 0 5px;
  color: gray;
`;

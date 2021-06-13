import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const NavIcon = ({ Icon, route }) => {
  const router = useRouter();
  return (
    <Link href={route}>
      <Container>
        <Icon style={{ fontSize: "25px" }} />
      </Container>
    </Link>
  );
};

export default NavIcon;

const Container = styled.div`
  cursor: pointer;
  color: lightgray;
  height: 10vh;
  padding: 0 20px;
  display: flex;
  align-items: center;

  :active {
    border-bottom: 5px solid #58ffd5;
    box-sizing: border-box;
  }
  :hover {
    color: #58ffd5;
    background-color: lightgray;
  }
  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

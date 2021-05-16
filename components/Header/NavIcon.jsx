import styled from "styled-components";

const NavIcon = ({ Icon }) => {
  return (
    <Container>
      <Icon style={{ fontSize: "27px" }} />
    </Container>
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
`;

import Image from "next/image";
import styled from "styled-components";

const Row = ({ src, Icon, title }) => {
  return (
    <Container>
      {src ? (
        <Img src={src} height={30} width={30} layout="fixed" />
      ) : (
        <Icon style={{ color: "#4bdab6", fontSize: "30px" }} />
      )}

      <Title>{title}</Title>
    </Container>
  );
};

export default Row;

const Img = styled(Image)`
  border-radius: 50%;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 1.5rem;
  width: 180px;
  border-radius: 10px;
  padding: 10px 20px;
  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
    width: max-content;
  }
  :hover {
    background-color: #fafafa;
    cursor: pointer;
  }
`;

const Title = styled.span`
  margin-left: 10px;
  font-size: 17px;
  @media (max-width: 768px) {
    display: none;
  }
`;

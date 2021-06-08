import Image from "next/image";
import styled from "styled-components";

const Contact = ({ name, src }) => {
  return (
    <Container>
      <Img src={src} height={50} width={50} layout="fixed" objectFit="cover" />
      <Name>{name}</Name>
      <Badge> </Badge>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
  position: relative;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
    border-radius: 15px;
  }
`;
const Name = styled.p`
  padding-left: 10px;
  font-weight: 500;
`;
const Img = styled(Image)`
  border-radius: 50%;
`;

const Badge = styled.div`
  background-color: lightgreen;
  position: absolute;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  left: 40px;
  bottom: 10px;
`;

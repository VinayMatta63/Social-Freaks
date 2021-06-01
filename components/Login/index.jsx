import { signin } from "next-auth/client";
import Image from "next/image";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Image
        src="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos-_f11ptx.jpg"
        layout="fill"
        objectFit="contain"
      />

      <Button onClick={signin}>Login / Signup</Button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  text-align: center;
  z-index: 10;
  cursor: pointer;
  margin: 40px;
  padding: 10px 20px;
  background-color: #4bdab6;
  border: none;
  outline: none;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  transition-duration: 0.4s;

  :hover {
    background-color: green;
    color: white;
    border: 2px solid white;
    box-sizing: border-box;
    transform: translateY(-5px);
  }
`;

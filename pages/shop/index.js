import { Fab, IconButton } from "@material-ui/core";
import { ArrowLeft, ArrowRight, ShoppingCart } from "@material-ui/icons";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import Home from "../../components/Shop/Home";
import { cartSum, selectItems } from "../../helpers/slices/cartSlice";

export default function watch({ session }) {
  const cart = useSelector(selectItems);
  const router = useRouter();
  const [open, setOpen] = useState(cart.length > 0 ? true : false);
  if (!session) {
    return <Login />;
  }

  return (
    <Container>
      <Head>
        <title>Freaks Shop</title>
        <meta name="description" content="Shopping platform for Geeks" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
        />
      </Head>
      <Header />
      <Main>
        <ButtonContainer
          style={{ transform: `${open ? "none" : "translateX(60%)"}` }}
        >
          {open ? (
            <IconButton onClick={() => setOpen(!open)}>
              <ArrowRight style={{ fontSize: "30px" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setOpen(!open)}>
              <ArrowLeft style={{ fontSize: "30px" }} />
            </IconButton>
          )}

          <Fab
            color="primary"
            variant="extended"
            style={{
              // display: `${open ? "inline" : "none"}`,
              visibility: `${open ? "visible" : "hidden"}`,
            }}
            onClick={() => router.push("/shop/checkout")}
          >
            <ShoppingCart /> {cart.length > 0 ? cartSum(cart) : "Cart"}
          </Fab>
        </ButtonContainer>
        <Home />
      </Main>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 101;
  right: 0;
  padding: 5px;
  padding-right: 1vw;
  background-color: #fafafa;
  border-radius: 20px 0 0 20px;
  transition-duration: 0.3s;
`;

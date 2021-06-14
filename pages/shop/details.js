import { Fab, IconButton } from "@material-ui/core";
import {
  ArrowLeft,
  ArrowRight,
  History,
  ShoppingCart,
} from "@material-ui/icons";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import Details from "../../components/Shop/Details/Details";
import { cartSum, selectItems } from "../../helpers/slices/cartSlice";

export default function details({ session }) {
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
          style={{ transform: `${open ? "none" : "translateX(80%)"}` }}
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
              backgroundColor: "#3fb497",
            }}
            disabled={cart.length <= 0 ? true : false}
            onClick={() => router.push("/shop/checkout")}
          >
            <ShoppingCart /> {cart.length > 0 ? cartSum(cart) : "Cart"}
          </Fab>
          <Fab
            color="primary"
            variant="extended"
            style={{ backgroundColor: "#3fb497" }}
            onClick={() => router.push("/shop/orders")}
          >
            <History /> Orders
          </Fab>
        </ButtonContainer>
        <Details />
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

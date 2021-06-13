import { getSession } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import Home from "../../components/Shop/Home";

export default function watch({ session, topRated }) {
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

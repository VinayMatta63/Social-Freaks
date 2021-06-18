import { getSession } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Chat/Sidebar";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import { db } from "../../firebase";

export default function Chat({ session }) {
  if (!session) {
    return <Login />;
  }
  return (
    <Container>
      <Head>
        <title>Freaks Chat</title>
        <meta name="description" content="Chatting platform for Geeks" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dpnapmmwm/image/upload/v1622458967/Others/Social_Freaks-logos--_ljd13h.jpg"
        />
      </Head>
      <Header />
      <Main>
        <Sidebar />
      </Main>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (
    session &&
    !(
      await (
        await db.collection("users").get()
      ).docs.map((user) => user.data().email)
    ).includes(session.user.email)
  ) {
    db.collection("users")
      .doc(session.user.email)
      .set({ ...session.user });
  }
  return { props: { session } };
}

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;

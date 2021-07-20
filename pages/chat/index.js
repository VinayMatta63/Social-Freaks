import { useSession } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Chat/Sidebar";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import setUser from "../../helpers/setUser";

export default function Chat() {
  const [session] = useSession();
  if (!session) {
    return <Login />;
  } else {
    setUser(session);
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

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

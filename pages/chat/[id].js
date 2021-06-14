import { getSession } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/Chat/ChatScreen";
import Sidebar from "../../components/Chat/Sidebar";
import Header from "../../components/Header/Header";
const Chat = () => {
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
        <ChatContainer>
          <ChatScreen />
        </ChatContainer>
      </Main>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const session = await getSession(context);
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

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; //EDGE
  scrollbar-width: none; //Firefox
`;

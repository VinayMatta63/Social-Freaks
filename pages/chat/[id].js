import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";

const ChatScreen = dynamic(() => import("../../components/Chat/ChatScreen"), {
  ssr: false,
});

import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Chat/Sidebar";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import { db } from "../../firebase";
import getRecipientEmail from "../../helpers/getRecipientEmail";
import setUser from "../../helpers/setUser";
const Chat = ({ messages, chat }) => {
  const [session] = useSession();
  if (!session) {
    return <Login />;
  } else {
    setUser(session);
  }
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, session.user)}</title>
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
          <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
      </Main>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return { props: { messages: JSON.stringify(messages), chat: chat } };
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

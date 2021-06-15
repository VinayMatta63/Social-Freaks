import { getSession } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/Chat/ChatScreen";
import Sidebar from "../../components/Chat/Sidebar";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import { db } from "../../firebase";
import getRecipientEmail from "../../helpers/getRecipientEmail";
const Chat = ({ session, messages, chat }) => {
  if (!session) {
    return <Login />;
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
  const session = await getSession(context);
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
  return { props: { session, messages: JSON.stringify(messages), chat: chat } };
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

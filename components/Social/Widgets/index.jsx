import { IconButton } from "@material-ui/core";
import { MoreHoriz, Search, Videocam } from "@material-ui/icons";
import { useSession } from "next-auth/client";
// import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../../firebase";
import Chat from "../../Chat/Chat";
import Image from "next/image";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const Widgets = () => {
  const [session] = useSession();
  const [chatsSnapshot, setUserChats] = useState();
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", session.user.email)
  );
  getDocs(q).then((docs) => setUserChats(docs));
  // db.collection("chats").where("users", "array-contains", session.user.email);
  // const [chatsSnapshot] = useCollection(userChatRef);
  return (
    <Container>
      <WidgetHeader>
        <h2>Friends</h2>
        <Icons>
          <IconButton>
            <Videocam style={{ color: "#3fb497" }} />
          </IconButton>
          <IconButton>
            <Search style={{ color: "#3fb497" }} />
          </IconButton>
          <IconButton>
            <MoreHoriz style={{ color: "#3fb497" }} />
          </IconButton>
        </Icons>
      </WidgetHeader>
      {chatsSnapshot?.docs.length < 1 ? (
        <Cover>
          <Image src={"/nothing.svg"} height={150} width={150} layout="fixed" />
        </Cover>
      ) : (
        chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))
      )}
    </Container>
  );
};

export default Widgets;

const Container = styled.div`
  flex: 0.2;
  position: fixed;
  right: 0;
  margin-top: 45px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3fb497;
`;
const Icons = styled.div`
  display: flex;
  margin-left: 10px;
`;

const Cover = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

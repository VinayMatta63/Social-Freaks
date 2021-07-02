import { IconButton } from "@material-ui/core";
import { MoreHoriz, Search, Videocam } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../../firebase";
import Chat from "../../Chat/Chat";

const Widgets = () => {
  const [session] = useSession();
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", session.user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
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

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
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

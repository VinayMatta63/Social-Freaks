import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [session] = useSession();
  const router = useRouter();
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", session.user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt(
      "Please enter the email address of the user you you want to chat with"
    );
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      input !== session.user.email &&
      !chatExists(input)
    ) {
      db.collection("chats").add({
        users: [session.user.email, input],
      });
    }
  };
  const chatExists = (chatEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === chatEmail)?.length > 0
    );
  };
  return (
    <Container id={router.query.id}>
      <Header>
        <UserAvatar src={session.user.image} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (max-width: 767px) {
    ${(props) => props.id && "display:none"}
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0px;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

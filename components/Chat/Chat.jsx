import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import getRecipientEmail from "../../helpers/getRecipientEmail";
import { useSession } from "next-auth/client";

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [session] = useSession();

  const [recipientSnapshot] = useCollection(db.collection("users"));
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipientEmail = getRecipientEmail(users, session.user);
  const recipient = recipientSnapshot?.docs
    .map((user) => user.data())
    .filter((user) => user.email === recipientEmail)[0];

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.image} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

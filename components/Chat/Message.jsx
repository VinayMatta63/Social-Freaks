import { useSession } from "next-auth/client";
import styled from "styled-components";

const Message = ({ user, message }) => {
  const [session] = useSession();
  return (
    <ChatMessage reciever={message.user === session.user.email}>
      <ChatName>{message.name}</ChatName>
      {message.message}
      <ChatTimestamp>
        {message.timestamp
          ? `${new Date(message.timestamp).toLocaleDateString("en-US")}
        ${new Date(message.timestamp).toLocaleTimeString("en-US")}`
          : "Loading...."}
      </ChatTimestamp>
    </ChatMessage>
  );
};

export default Message;
const ChatMessage = styled.div`
  position: relative;
  font-size: 16px;
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 30px;
  ${(props) => props.reciever && "margin-left: auto;background-color: #dcf8c6;"}
`;

const ChatName = styled.span`
  position: absolute;
  top: -15px;
  font-weight: 800;
  font-size: xx-small;
`;
const ChatTimestamp = styled.span`
  margin-left: 10px;
  font-size: xx-small;
`;

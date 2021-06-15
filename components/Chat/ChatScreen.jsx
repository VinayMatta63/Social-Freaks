import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { Avatar, IconButton, Modal, Tooltip } from "@material-ui/core";
import Picker from "emoji-picker-react";
import firebase from "firebase";
import {
  AttachFile,
  InsertEmoticon,
  MicOutlined,
  Cancel,
  SearchOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import getRecipientEmail from "../../helpers/getRecipientEmail";

const ChatScreen = ({ chat, messages }) => {
  const [session] = useSession();
  const router = useRouter();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(db.collection("users"));
  const recipientEmail = getRecipientEmail(chat.users, session.user);
  const recipient = recipientSnapshot?.docs
    .map((user) => user.data())
    .filter((user) => user.email === recipientEmail)[0];

  const [input, setInput] = useState("");
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    input ? setInput(input + chosenEmoji) : setInput(chosenEmoji);
  };

  const { transcript, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    resetTranscript();
    // db.collection("users")
    //   .doc(user.uid)
    //   .set(
    //     { lastSeen: firebase.firestore.FieldValue.serverTimestamp() },
    //     { merge: true }
    //   );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: session.user.email,
      profile: session.user.image,
    });
    setInput("");
  };
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  return (
    <Container>
      <Header>
        <Avatar src={recipient?.image} />
        <HeaderInfo>
          <Name>{recipient?.name}</Name>
          <p>{recipient?.email}</p>
        </HeaderInfo>
        <div>
          <Tooltip title="Search" arrow={true}>
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach" arrow={true}>
            <IconButton>
              <AttachFile />
            </IconButton>
          </Tooltip>
          <Link href={"/chat"}>
            <Tooltip title="Close Window" arrow={true}>
              <IconButton>
                <Cancel />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Header>
      <ChatBody>{showMessages()}</ChatBody>
      <ChatFooter>
        <Tooltip title="Emoji" arrow={true}>
          <IconButton onClick={handleOpen}>
            <InsertEmoticon />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {<Picker onEmojiClick={onEmojiClick} />}
        </Modal>
        <Form>
          <Input
            value={input}
            onInput={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <Button onClick={sendMessage} disabled={!input} type="submit">
            Send
          </Button>
        </Form>
        <Tooltip title="Speech to Text" arrow={true}>
          <IconButton
            onClick={SpeechRecognition.startListening}
            onMouseOut={SpeechRecognition.stopListening}
          >
            <MicOutlined />
          </IconButton>
        </Tooltip>
      </ChatFooter>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  position: sticky;
`;

const HeaderInfo = styled.div`
  flex: 1;
  padding-left: 20px;
  color: gray;
`;
const Name = styled.h3`
  margin-bottom: 3px;
  font-weight: 500;
  color: black;
`;
const ChatBody = styled.div`
  flex: 1;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
  background-position: center;
  padding: 30px;
  overflow: scroll;
  min-height: 71vh;
  position: relative;
`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
  position: sticky;
  bottom: 0;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none;
  outline-width: 0;
`;
const Button = styled.button`
  display: none;
`;

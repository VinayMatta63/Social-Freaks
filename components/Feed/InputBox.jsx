import { CameraAlt, EmojiEmotions, Videocam } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import Image from "next/image";
import styled from "styled-components";

const InputBox = () => {
  const sendPost = (e) => {
    e.preventDefault();
  };
  const [session] = useSession();
  return (
    <Container>
      <Status>
        <Img src={session.user.image} height={40} width={40} layout="fixed" />
        <Form>
          <Input
            placeholder={`What's on your mind, ${session.user.name}?`}
            type="text"
          />
          <Submit onClick={(e) => sendPost(e)}>Submit</Submit>
        </Form>
      </Status>
      <Buttons>
        <Button type="live">
          <Videocam />
          <ButtonTitle>Live Video</ButtonTitle>
        </Button>
        <Button type="upload">
          <CameraAlt />
          <ButtonTitle>Photo / Video</ButtonTitle>
        </Button>
        <Button type="activity">
          <EmojiEmotions />
          <ButtonTitle>Feeling / Activity</ButtonTitle>
        </Button>
      </Buttons>
    </Container>
  );
};

export default InputBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightgray;
  margin-top: 30px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Status = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid lightgray;
`;
const Img = styled(Image)`
  border-radius: 50%;
`;
const Input = styled.input`
  font-size: 17px;
  flex: 1;
  margin: 0 15px;
  outline: none;
  border: none;
  padding-left: 15px;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
`;
const Submit = styled.button`
  visibility: hidden;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  justify-content: center;
  ${(props) => {
    if (props.type === "live") {
      return "color:red;border-radius:0 0 0 15px;";
    } else if (props.type === "upload") {
      return "color:lightgreen;";
    } else {
      return "color:#e7e702;border-radius:0 0 15px 0;";
    }
  }}
  transition-duration: 0.3s;
  :hover {
    ${(props) => {
      if (props.type === "live") {
        return "background-color:red;color:white;";
      } else if (props.type === "upload") {
        return "background-color:lightgreen;color:white;;";
      } else {
        return "background-color:#e7e702;color:white;";
      }
    }}
  }
`;

const ButtonTitle = styled.span`
  margin-left: 10px;
`;

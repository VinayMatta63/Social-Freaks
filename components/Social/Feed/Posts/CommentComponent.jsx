import { Delete } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import Image from "next/image";
import styled from "styled-components";
import { db } from "../../../../firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";

const CommentComponent = ({
  postId,
  id,
  name,
  message,
  email,
  timestamp,
  image,
}) => {
  // const truncatedMessage = (message) => {
  //   return message.slice(0, 40);
  // };
  const [session] = useSession();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteComment = () => {
    db.collection("posts").doc(postId).collection("comments").doc(id).delete();
  };
  return (
    <Container>
      <Img src={image} height={30} width={30} layout="fixed" />
      <InnerCover>
        <UserInfo>
          <Name>{name}</Name>
          <Right>
            {timestamp ? (
              <Timestamp>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </Timestamp>
            ) : (
              <Timestamp>Loading...</Timestamp>
            )}
            {email === session.user.email && (
              <Delete
                style={{
                  color: "#3fb497",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={handleClickOpen}
              />
            )}
          </Right>
        </UserInfo>
        <Comment>
          {message}
          {/* {message.length > 40 ? truncatedMessage(message) : message} */}
        </Comment>
      </InnerCover>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleted comment will be lost forever. Do you still want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autofocus>
            Cancel
          </Button>
          <Button onClick={deleteComment} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommentComponent;

const Container = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #fafafa;
`;

const Img = styled(Image)`
  border-radius: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`;
const UserInfo = styled.div`
  display: flex;
  margin-left: 10px;
  justify-content: space-between;
`;
const Name = styled.p`
  font-weight: 700;
  font-size: 12px;
`;
const Timestamp = styled.p`
  font-size: 10px;
  color: gray;
`;

const Comment = styled.p`
  word-break: break-all;
  text-align: justify;
  max-width: 80%;
  margin-left: 20px;
  flex: 0.8;
`;

const InnerCover = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Right = styled.div`
  display: flex;
`;

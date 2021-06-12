import { Collapse, IconButton, Tooltip } from "@material-ui/core";
import { Comment, Delete, Favorite, Send, Share } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../../../../firebase";
import firebase from "firebase";
import CommentComponent from "./CommentComponent";
import { useCollection } from "react-firebase-hooks/firestore";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Post = ({
  id,
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
  postVideo,
  activity,
}) => {
  const [session] = useSession();
  const [commentBar, setCommentBar] = useState(false);
  const [open, setOpen] = useState(false);

  const [likes] = useCollection(
    db.collection("posts").doc(id).collection("likes")
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const likePost = () => {
    const like = likes?.docs.filter(
      (item) => item.data().email === session.user.email
    )[0];
    like
      ? db.collection("posts").doc(id).collection("likes").doc(like.id).delete()
      : db.collection("posts").doc(id).collection("likes").add({
          email: session.user.email,
        });
  };
  const deletePost = () => {
    db.collection("posts").doc(id).delete();
  };
  const commentRef = useRef(null);
  const [comments] = useCollection(
    db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "desc")
  );
  const sendComment = (e) => {
    e.preventDefault();
    if (!commentRef.current.value) return;
    db.collection("posts").doc(id).collection("comments").add({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      comment: commentRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    commentRef.current.value = "";
  };
  const getComments = () => {
    setCommentBar(!commentBar);
  };
  return (
    <Container>
      <PostHeader>
        <UserInfo>
          <Img src={image} height={40} width={40} layout="fixed" />
          <HeaderInfo>
            <Name>{name}</Name>
            {timestamp ? (
              <Timestamp>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </Timestamp>
            ) : (
              <Timestamp>Loading...</Timestamp>
            )}
          </HeaderInfo>
        </UserInfo>
        {email === session.user.email && (
          <Tooltip title="Delete" arrow>
            <Delete
              style={{
                color: "#3fb497",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={handleClickOpen}
            />
          </Tooltip>
        )}
      </PostHeader>
      <Message>
        <Text>{message}</Text>
        {activity && <Activity>{activity}</Activity>}
      </Message>

      {postImage && (
        <ImageCover>
          <Image src={postImage} objectFit="cover" layout="fill" />
        </ImageCover>
      )}
      {postVideo && (
        <video
          style={{ width: "100%", height: "300px" }}
          controls
          // autoPlay
          loop
        >
          <source src={postVideo} />
        </video>
      )}
      <PostFooter>
        <FooterButton
          onClick={likePost}
          liked={
            likes?.docs.filter(
              (item) => item.data().email === session.user.email
            )[0]
              ? true
              : false
          }
        >
          <Favorite />
          <ButtonText type="likes">{likes?.docs.length} likes</ButtonText>
        </FooterButton>
        <FooterButton onClick={getComments} clicked={commentBar}>
          <Comment />
          <ButtonText type="comment">
            {comments?.docs.length} <ButtonText> Comments</ButtonText>{" "}
          </ButtonText>
        </FooterButton>
        <FooterButton>
          <Share />
          <ButtonText>Share</ButtonText>
        </FooterButton>
      </PostFooter>
      <Collapse in={commentBar}>
        <CommentCover>
          <CommentBar onSubmit={(e) => sendComment(e)}>
            <InputComment
              type="text"
              ref={commentRef}
              placeholder="Add Comment.."
            />
            <IconButton onClick={(e) => sendComment(e)}>
              <Send style={{ color: "#3fb497" }} />
            </IconButton>
          </CommentBar>
          <CommentBox>
            {comments &&
              comments.docs.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  postId={id}
                  id={comment.id}
                  name={comment.data().name}
                  message={comment.data().comment}
                  email={comment.data().email}
                  timestamp={comment.data().timestamp}
                  image={comment.data().image}
                />
              ))}
          </CommentBox>
        </CommentCover>
      </Collapse>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleted Post will be lost forever. Do you still want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autofocus>
            Cancel
          </Button>
          <Button onClick={deletePost} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  margin-top: 10px;
  border: 1px solid lightgray;
  border-radius: 10px 10px 0 0;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
`;
const PostHeader = styled.div`
  display: flex;
  padding: 10px;
`;
const Img = styled(Image)`
  border-radius: 50%;
`;
const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
`;
const Name = styled.p`
  font-weight: 500;
  font-size: 15px;
`;
const Timestamp = styled.p`
  font-size: 12px;
  color: gray;
`;
const Message = styled.p`
  display: flex;
  padding: 10px;
`;
const ImageCover = styled.div`
  position: relative;
  height: 300px;
`;
const PostFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const FooterButton = styled.span`
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  transition-duration: 0.3s;
  color: #3fb497;
  font-weight: 500;
  :hover {
    background-color: #4bdab6;
    ${(props) => (props.liked ? "color: red;" : "color:white;")}
  }
  ${(props) => props.clicked && "background-color: #4bdab6;color: white;"}
  ${(props) => props.liked && "color: red;"}
`;
const Activity = styled.span`
  padding: 5px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  margin-right: 5px;
`;

const ButtonText = styled.span`
  padding-left: 5px;
  @media (max-width: 768px) {
    display: none;
    ${(props) => props.type && "display:inline"}
  }
`;
const CommentBar = styled.form`
  display: flex;
  border-top: 1px solid lightgray;
  padding: 5px;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const InputComment = styled.input`
  flex: 0.6;
  padding: 7px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #3fb497;
`;

const CommentBox = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  flex-direction: column;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
const CommentCover = styled.div``;

const Text = styled.span`
  flex: 1;
`;

import { IconButton } from "@material-ui/core";
import { Comment, Favorite, Send, Share } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";
import firebase from "firebase";

const Post = ({
  id,
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
  activity,
}) => {
  const [session] = useSession();
  const [commentBar, setCommentBar] = useState(false);
  const commentRef = useRef(null);

  const sendComment = async (e) => {
    e.preventDefault();
    if (!commentRef.current.value) return;
    await db.collection("posts").doc(id).collection("comments").add({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      comment: commentRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //   .then((doc) => {
    //     if (activity) {
    //       removeActivity();
    //     }
    //     if (imageForPost) {
    //       const uploadTask = storage
    //         .ref(`posts/${doc.id}`)
    //         .putString(imageForPost, "data_url");

    //       removeImage();
    //       uploadTask.on(
    //         "state_change",
    //         null,
    //         (error) => {
    //           console.error(error);
    //         },
    //         () => {
    //           storage
    //             .ref("posts")
    //             .child(doc.id)
    //             .getDownloadURL()
    //             .then((url) => {
    //               db.collection("posts").doc(doc.id).set(
    //                 {
    //                   postImage: url,
    //                 },
    //                 { merge: true }
    //               );
    //             });
    //         }
    //       );
    //     }
    //   });
    commentRef.current.value = "";
  };
  return (
    <Container>
      <PostHeader>
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
      </PostHeader>
      <Message>
        {message}
        {activity && <Activity>{activity}</Activity>}
      </Message>

      {postImage && (
        <ImageCover>
          <Image src={postImage} objectFit="cover" layout="fill" />
        </ImageCover>
      )}
      <PostFooter>
        <FooterButton>
          <Favorite />
          <ButtonText>Like</ButtonText>
        </FooterButton>
        <FooterButton onClick={() => setCommentBar(!commentBar)}>
          <Comment />
          <ButtonText>Comment</ButtonText>
        </FooterButton>
        <FooterButton>
          <Share />
          <ButtonText>Share</ButtonText>
        </FooterButton>
      </PostFooter>
      {commentBar && (
        <CommentBar>
          <InputComment
            type="text"
            ref={commentRef}
            placeholder="Add Comment.."
          />
          <IconButton>
            <Send
              style={{ color: "#3fb497" }}
              onClick={(e) => sendComment(e)}
            />
          </IconButton>
        </CommentBar>
      )}
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
  padding: 10px;
`;
const ImageCover = styled.div`
  position: relative;
  height: 250px;
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
    color: white;
  }
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

import { Comment, Favorite, Share } from "@material-ui/icons";
import Image from "next/image";
import styled from "styled-components";

const Post = ({
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
  activity,
}) => {
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
        <FooterButton>
          <Comment />
          <ButtonText>Comment</ButtonText>
        </FooterButton>
        <FooterButton>
          <Share />
          <ButtonText>Share</ButtonText>
        </FooterButton>
      </PostFooter>
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
`;

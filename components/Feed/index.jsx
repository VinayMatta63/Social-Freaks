import styled from "styled-components";
import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = ({ posts }) => {
  return (
    <Container>
      <Stories />
      <InputBox />
      <Posts posts={posts} />
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  max-width: 45vw;
  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 100%;
  }
`;

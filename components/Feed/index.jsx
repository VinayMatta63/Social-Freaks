import styled from "styled-components";
import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <Container>
      <Stories />
      <InputBox />
      <Posts />
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  max-width: 45vw;
`;

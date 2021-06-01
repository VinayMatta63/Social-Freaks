import styled from "styled-components";
import InputBox from "./InputBox";
import Stories from "./Stories/Stories";

const Feed = () => {
  return (
    <Container>
      <Stories />
      <InputBox />
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  max-width: 45vw;
`;

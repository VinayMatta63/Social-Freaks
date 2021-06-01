import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/client";

const StoryCard = ({ data }) => {
  const [session] = useSession();
  return (
    <Container>
      <Profile
        src={session.user.image}
        height={40}
        width={40}
        layout="fixed"
        objectFit="cover"
      />
      <Img src={session.user.image} layout="fill" />
    </Container>
  );
};

export default StoryCard;

const Container = styled.div`
  height: 27vh;
  width: 10vw;
  flex-shrink: 0;
  position: relative;
  padding: 5px;
  margin: 0 0.3rem;
  @media (max-width: 768px) {
    height: 12vw;
    width: 12vw;
  }
`;
const Profile = styled(Image)`
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  z-index: 10;
  @media (min-width: 768px) {
    opacity: 1;
  }
`;
const Img = styled(Image)`
  border-radius: 10px;
  @media (max-width: 768px) {
    border-radius: 50%;
  }
`;

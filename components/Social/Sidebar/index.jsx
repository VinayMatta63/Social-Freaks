import {
  CalendarToday,
  Computer,
  Home,
  Message,
  MoreHoriz,
  People,
  Person,
  ShoppingBasketOutlined,
  TimerOutlined,
} from "@material-ui/icons";
import { useSession } from "next-auth/client";
import styled from "styled-components";
import Row from "./Row";

const Sidebar = () => {
  const [session] = useSession();
  return (
    <Container>
      <Row src={session.user.image} title={session.user.name} href="/" />
      <Row Icon={Home} title="Home" href="/" />
      <Row Icon={Person} title="Friends" href="/" />
      <Row Icon={ShoppingBasketOutlined} title="Shop" href="/shop" />
      <Row Icon={Computer} title="Watch" href="/watch" />
      <Row Icon={Message} title="Chat" href="/chat" />
      <Row Icon={MoreHoriz} title="More" href="/" />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  max-width: 30vw;
  position: fixed;
  margin-top: 45px;
  left: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;
